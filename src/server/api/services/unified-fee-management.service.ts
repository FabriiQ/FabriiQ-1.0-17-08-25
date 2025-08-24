/**
 * Unified Fee Management Service
 * Consolidates all fee-related operations into a single, coherent service
 */

import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  UnifiedFeeConfig,
  unifiedFeeConfigSchema,
  feeConfigUpdateSchema,
  FeeConfigUpdate,
  FeeConfigSection,
  LateFeeCalculationType,
  CompoundingInterval,
  ReceiptTemplate,
  NotificationFrequency
} from "@/types/fee-management-unified";
import { DEFAULT_CURRENCY } from "@/data/currencies";

export class UnifiedFeeManagementService {
  constructor(private prisma: PrismaClient) {}

  // ========================================================================
  // CONFIGURATION MANAGEMENT
  // ========================================================================

  /**
   * Get complete fee management configuration
   */
  async getConfiguration(filters?: {
    institutionId?: string;
    campusId?: string;
  }): Promise<UnifiedFeeConfig> {
    try {
      // Get configuration from database
      const config = await this.prisma.systemConfig.findFirst({
        where: {
          key: 'unified_fee_config',
          category: 'fee_management',
          ...(filters?.institutionId && { 
            metadata: { path: ['institutionId'], equals: filters.institutionId }
          }),
          ...(filters?.campusId && { 
            metadata: { path: ['campusId'], equals: filters.campusId }
          }),
        }
      });

      if (config?.value) {
        // Validate and return existing configuration
        const parsedConfig = unifiedFeeConfigSchema.parse(config.value);
        return parsedConfig;
      }

      // Return default configuration if none exists
      return this.getDefaultConfiguration(filters);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid configuration format",
          cause: error,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get fee configuration",
        cause: error,
      });
    }
  }

  /**
   * Update fee management configuration
   */
  async updateConfiguration(
    updates: FeeConfigUpdate,
    filters?: {
      institutionId?: string;
      campusId?: string;
    },
    updatedBy?: string
  ): Promise<UnifiedFeeConfig> {
    try {
      // Get current configuration
      const currentConfig = await this.getConfiguration(filters);
      
      // Merge updates with current configuration
      const updatedConfig = {
        ...currentConfig,
        ...updates,
        system: {
          ...currentConfig.system,
          ...updates.system,
          lastUpdated: new Date(),
          ...(updatedBy && { updatedBy }),
        }
      };

      // Validate the updated configuration
      const validatedConfig = unifiedFeeConfigSchema.parse(updatedConfig);

      // Save to database
      await this.prisma.systemConfig.upsert({
        where: {
          key: 'unified_fee_config'
        },
        create: {
          key: 'unified_fee_config',
          category: 'fee_management',
          value: validatedConfig,
          description: 'Unified fee management configuration',
          createdById: updatedBy || 'system',
        },
        update: {
          value: validatedConfig,
          updatedById: updatedBy,
          updatedAt: new Date(),
        }
      });

      return validatedConfig;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid configuration data",
          cause: error,
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update fee configuration",
        cause: error,
      });
    }
  }

  /**
   * Get configuration for a specific section
   */
  async getConfigurationSection<T extends FeeConfigSection>(
    section: T,
    filters?: {
      institutionId?: string;
      campusId?: string;
    }
  ): Promise<UnifiedFeeConfig[T]> {
    const config = await this.getConfiguration(filters);
    return config[section];
  }

  /**
   * Update a specific configuration section
   */
  async updateConfigurationSection<T extends FeeConfigSection>(
    section: T,
    updates: Partial<UnifiedFeeConfig[T]>,
    filters?: {
      institutionId?: string;
      campusId?: string;
    },
    updatedBy?: string
  ): Promise<UnifiedFeeConfig[T]> {
    const fullUpdate = { [section]: updates } as FeeConfigUpdate;
    const updatedConfig = await this.updateConfiguration(fullUpdate, filters, updatedBy);
    return updatedConfig[section];
  }

  // ========================================================================
  // LATE FEE CALCULATIONS
  // ========================================================================

  /**
   * Calculate late fee for a given amount and overdue days
   */
  async calculateLateFee(
    principalAmount: number,
    daysOverdue: number,
    filters?: {
      institutionId?: string;
      campusId?: string;
    }
  ): Promise<{
    amount: number;
    breakdown: Array<{
      period: number;
      days: number;
      rate: number;
      amount: number;
      description: string;
    }>;
    totalDays: number;
    effectiveRate: number;
  }> {
    try {
      const config = await this.getConfiguration(filters);
      const { lateFees } = config;

      if (!lateFees.enabled || daysOverdue <= lateFees.gracePeriod.days) {
        return {
          amount: 0,
          breakdown: [],
          totalDays: daysOverdue,
          effectiveRate: 0,
        };
      }

      const effectiveDaysOverdue = daysOverdue - lateFees.gracePeriod.days;
      const breakdown: Array<{
        period: number;
        days: number;
        rate: number;
        amount: number;
        description: string;
      }> = [];

      let totalLateFee = 0;

      switch (lateFees.calculation.type) {
        case LateFeeCalculationType.FIXED:
          totalLateFee = lateFees.calculation.fixedAmount || 0;
          breakdown.push({
            period: 1,
            days: effectiveDaysOverdue,
            rate: 0,
            amount: totalLateFee,
            description: `Fixed late fee`,
          });
          break;

        case LateFeeCalculationType.PERCENTAGE:
          const percentageRate = lateFees.calculation.percentageRate || 0;
          totalLateFee = (principalAmount * percentageRate) / 100;
          breakdown.push({
            period: 1,
            days: effectiveDaysOverdue,
            rate: percentageRate,
            amount: totalLateFee,
            description: `${percentageRate}% of principal amount`,
          });
          break;

        case LateFeeCalculationType.DAILY_PERCENTAGE:
          const dailyRate = lateFees.calculation.dailyPercentageRate || 0;
          
          if (lateFees.calculation.compounding.enabled) {
            // Compound calculation
            let currentAmount = principalAmount;
            let period = 1;
            let remainingDays = effectiveDaysOverdue;
            
            const intervalDays = lateFees.calculation.compounding.interval === CompoundingInterval.DAILY ? 1 :
                               lateFees.calculation.compounding.interval === CompoundingInterval.WEEKLY ? 7 : 30;
            
            while (remainingDays > 0 && (!lateFees.calculation.compounding.maxPeriods || period <= lateFees.calculation.compounding.maxPeriods)) {
              const daysInPeriod = Math.min(remainingDays, intervalDays);
              const periodFee = (currentAmount * dailyRate * daysInPeriod) / 100;
              
              breakdown.push({
                period,
                days: daysInPeriod,
                rate: dailyRate,
                amount: periodFee,
                description: `Period ${period}: ${dailyRate}% daily for ${daysInPeriod} days`,
              });
              
              totalLateFee += periodFee;
              currentAmount += periodFee;
              remainingDays -= daysInPeriod;
              period++;
            }
          } else {
            // Simple daily calculation
            totalLateFee = (principalAmount * dailyRate * effectiveDaysOverdue) / 100;
            breakdown.push({
              period: 1,
              days: effectiveDaysOverdue,
              rate: dailyRate,
              amount: totalLateFee,
              description: `${dailyRate}% daily for ${effectiveDaysOverdue} days`,
            });
          }
          break;

        case LateFeeCalculationType.TIERED:
          const tieredRules = lateFees.calculation.tieredRules || [];
          
          for (const rule of tieredRules) {
            if (effectiveDaysOverdue >= rule.daysFrom && 
                (rule.daysTo === 0 || effectiveDaysOverdue <= rule.daysTo)) {
              
              const tierFee = rule.isPercentage 
                ? (principalAmount * rule.amount) / 100
                : rule.amount;
              
              totalLateFee += tierFee;
              breakdown.push({
                period: 1,
                days: effectiveDaysOverdue,
                rate: rule.isPercentage ? rule.amount : 0,
                amount: tierFee,
                description: `Tier: ${rule.daysFrom}-${rule.daysTo || '∞'} days`,
              });
            }
          }
          break;
      }

      // Apply limits
      if (lateFees.calculation.minAmount && totalLateFee < lateFees.calculation.minAmount) {
        totalLateFee = lateFees.calculation.minAmount;
      }
      
      if (lateFees.calculation.maxAmount && totalLateFee > lateFees.calculation.maxAmount) {
        totalLateFee = lateFees.calculation.maxAmount;
      }

      const effectiveRate = principalAmount > 0 ? (totalLateFee / principalAmount) * 100 : 0;

      return {
        amount: Math.round(totalLateFee * 100) / 100, // Round to 2 decimal places
        breakdown,
        totalDays: daysOverdue,
        effectiveRate: Math.round(effectiveRate * 100) / 100,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to calculate late fee",
        cause: error,
      });
    }
  }

  // ========================================================================
  // HELPER METHODS
  // ========================================================================

  /**
   * Get default configuration
   */
  private getDefaultConfiguration(filters?: {
    institutionId?: string;
    campusId?: string;
  }): UnifiedFeeConfig {
    return {
      institutionId: filters?.institutionId,
      campusId: filters?.campusId,
      
      general: {
        currency: DEFAULT_CURRENCY,
        dueDates: {
          defaultDaysFromEnrollment: 30,
          defaultDaysFromTermStart: 15,
          respectHolidays: true,
          extendOnWeekends: true,
          extendOnHolidays: true,
          customTermDueDates: [],
        },
        paymentMethods: {
          allowCash: true,
          allowCard: true,
          allowBankTransfer: true,
          allowOnlinePayment: true,
          allowInstallments: false,
        },
      },
      
      lateFees: {
        enabled: true,
        gracePeriod: {
          days: 7,
          applyOnWeekends: false,
          applyOnHolidays: false,
        },
        calculation: {
          type: LateFeeCalculationType.FIXED,
          fixedAmount: 50,
          minAmount: 0,
          compounding: {
            enabled: false,
            interval: CompoundingInterval.DAILY,
            capAtPrincipal: true,
          },
        },
        automation: {
          autoApply: false,
          processingSchedule: 'DAILY',
          processingTime: '02:00',
          dryRunFirst: true,
        },
        waivers: {
          allowRequests: true,
          requireApproval: true,
          maxWaiverPercentage: 100,
          allowedReasons: [
            'Financial hardship',
            'Medical emergency',
            'Administrative error',
            'Student withdrawal',
            'Payment processing delay',
            'Other'
          ],
          autoApprovalRules: [],
        },
      },
      
      receipts: {
        enabled: true,
        autoGenerate: true,
        template: ReceiptTemplate.DEFAULT,
        features: {
          includeQRCode: false,
          includeBarcode: false,
          includeLogo: true,
          includeSignature: false,
        },
        content: {
          footerText: 'Thank you for your payment',
          contactInfo: true,
        },
        delivery: {
          autoEmail: true,
          autoSMS: false,
          allowDownload: true,
          allowPrint: true,
        },
      },
      
      notifications: {
        enabled: true,
        dueDateReminders: {
          enabled: true,
          daysBefore: [7, 3, 1],
          channels: {
            email: true,
            sms: false,
            push: false,
            inApp: true,
          },
        },
        paymentConfirmations: {
          enabled: true,
          channels: {
            email: true,
            sms: false,
            push: false,
            inApp: true,
          },
          includeReceipt: true,
        },
        overdueNotifications: {
          enabled: true,
          frequency: NotificationFrequency.WEEKLY,
          escalationDays: [7, 14, 30],
          channels: {
            email: true,
            sms: false,
            push: false,
            inApp: true,
          },
        },
        lateFeeNotifications: {
          enabled: true,
          notifyBeforeApplication: true,
          daysBefore: 3,
          notifyAfterApplication: true,
          channels: {
            email: true,
            sms: false,
            push: false,
            inApp: true,
          },
        },
      },
      
      reporting: {
        enabled: true,
        retentionPeriodMonths: 24,
        archiveOldRecords: true,
        dashboards: {
          enableRealTimeData: true,
          refreshIntervalMinutes: 15,
          defaultDateRange: '30d' as const,
        },
        exports: {
          allowCSV: true,
          allowPDF: true,
          allowExcel: true,
          maxRecordsPerExport: 10000,
        },
      },
      
      system: {
        version: '1.0.0',
        lastUpdated: new Date(),
        updatedBy: 'system',
        validation: {
          strictMode: true,
          allowNegativeFees: false,
          requireApprovalForLargeFees: true,
          largeFeesThreshold: 10000,
        },
        integration: {
          enableWebhooks: false,
          enableAPIAccess: false,
          apiRateLimit: 100,
        },
      },
    };
  }

  /**
   * Validate configuration section
   */
  async validateConfiguration(config: Partial<UnifiedFeeConfig>): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Basic schema validation
      unifiedFeeConfigSchema.parse(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(...error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
      }
    }

    // Business logic validation
    if (config.lateFees?.calculation?.type === LateFeeCalculationType.PERCENTAGE &&
        !config.lateFees.calculation.percentageRate) {
      errors.push('Percentage rate is required for percentage-based late fees');
    }

    if (config.lateFees?.calculation?.compounding?.enabled &&
        !config.lateFees.calculation.compounding.maxPeriods) {
      warnings.push('Consider setting maximum compounding periods to prevent excessive fees');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  // ========================================================================
  // MIGRATION HELPERS
  // ========================================================================

  /**
   * Migrate existing settings to unified configuration
   */
  async migrateExistingSettings(filters?: {
    institutionId?: string;
    campusId?: string;
  }): Promise<{
    success: boolean;
    migratedSections: string[];
    errors: string[];
  }> {
    const migratedSections: string[] = [];
    const errors: string[] = [];

    try {
      // Get existing settings from various sources
      const existingConfigs = await this.prisma.systemConfig.findMany({
        where: {
          category: 'fee_management',
          key: { in: ['fee_settings', 'late_fee_settings', 'receipt_settings', 'notification_settings'] }
        }
      });

      const defaultConfig = this.getDefaultConfiguration(filters);
      let unifiedConfig = { ...defaultConfig };

      // Migrate each existing configuration
      for (const config of existingConfigs) {
        try {
          const configValue = config.value as any;

          switch (config.key) {
            case 'fee_settings':
              if (configValue.currency) {
                unifiedConfig.general.currency = configValue.currency;
              }
              if (configValue.dueDateSettings) {
                unifiedConfig.general.dueDates = {
                  ...unifiedConfig.general.dueDates,
                  ...configValue.dueDateSettings,
                };
              }
              migratedSections.push('general');
              break;

            case 'late_fee_settings':
              if (configValue.enableLateFees !== undefined) {
                unifiedConfig.lateFees.enabled = configValue.enableLateFees;
              }
              if (configValue.gracePeriodDays !== undefined) {
                unifiedConfig.lateFees.gracePeriod.days = configValue.gracePeriodDays;
              }
              if (configValue.lateFeeAmount !== undefined) {
                unifiedConfig.lateFees.calculation.fixedAmount = configValue.lateFeeAmount;
              }
              if (configValue.autoApply !== undefined) {
                unifiedConfig.lateFees.automation.autoApply = configValue.autoApply;
              }
              migratedSections.push('lateFees');
              break;

            case 'receipt_settings':
              if (configValue.enabled !== undefined) {
                unifiedConfig.receipts.enabled = configValue.enabled;
              }
              if (configValue.autoGenerate !== undefined) {
                unifiedConfig.receipts.autoGenerate = configValue.autoGenerate;
              }
              if (configValue.includeQRCode !== undefined) {
                unifiedConfig.receipts.features.includeQRCode = configValue.includeQRCode;
              }
              migratedSections.push('receipts');
              break;

            case 'notification_settings':
              if (configValue.enabled !== undefined) {
                unifiedConfig.notifications.enabled = configValue.enabled;
              }
              if (configValue.dueDateReminders) {
                unifiedConfig.notifications.dueDateReminders = {
                  ...unifiedConfig.notifications.dueDateReminders,
                  ...configValue.dueDateReminders,
                };
              }
              migratedSections.push('notifications');
              break;
          }
        } catch (error) {
          errors.push(`Failed to migrate ${config.key}: ${error}`);
        }
      }

      // Save the unified configuration
      await this.updateConfiguration(unifiedConfig, filters, 'migration');

      return {
        success: errors.length === 0,
        migratedSections: [...new Set(migratedSections)],
        errors,
      };
    } catch (error) {
      return {
        success: false,
        migratedSections,
        errors: [`Migration failed: ${error}`],
      };
    }
  }
}
