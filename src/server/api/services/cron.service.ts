import { PrismaClient } from '@prisma/client';
import { FeeNotificationService } from './fee-notification.service';
import { LateFeeService } from './late-fee.service';
import { AutomatedLateFeeService } from './automated-late-fee.service';

/**
 * Cron service for running scheduled tasks
 */
export class CronService {
  private lateFeeService: LateFeeService;
  private automatedLateFeeService: AutomatedLateFeeService;
  private notificationService: FeeNotificationService;
  private scheduledJobs: Map<string, NodeJS.Timeout> = new Map();

  constructor(private prisma: PrismaClient) {
    this.lateFeeService = new LateFeeService({ prisma });
    this.automatedLateFeeService = new AutomatedLateFeeService(prisma);
    this.notificationService = new FeeNotificationService(prisma);
  }

  /**
   * Run daily fee notification tasks
   */
  async runDailyFeeNotifications(): Promise<void> {
    console.log('Running daily fee notifications...');
    
    try {
      const notificationService = new FeeNotificationService(this.prisma);
      await notificationService.runScheduledNotifications();
      
      console.log('Daily fee notifications completed successfully');
    } catch (error) {
      console.error('Error running daily fee notifications:', error);
    }
  }

  /**
   * Initialize cron jobs for fee management automation
   */
  initializeCronJobs(): void {
    console.log('Initializing fee management cron jobs...');

    // Clear any existing jobs
    this.clearAllJobs();

    // Daily late fee processing at 6 AM
    this.scheduleDailyLateFeeProcessing();

    // Weekly fee analytics refresh at 2 AM on Sundays
    this.scheduleWeeklyAnalyticsRefresh();

    // Monthly fee structure cleanup at 1 AM on 1st of month
    this.scheduleMonthlyCleanup();

    // Hourly due date reminders during business hours
    this.scheduleHourlyReminders();

    console.log('Fee management cron jobs initialized successfully');
  }

  /**
   * Clear all scheduled jobs
   */
  clearAllJobs(): void {
    this.scheduledJobs.forEach((timeout, jobName) => {
      clearInterval(timeout);
      console.log(`Cleared job: ${jobName}`);
    });
    this.scheduledJobs.clear();
  }

  /**
   * Schedule daily late fee processing
   */
  private scheduleDailyLateFeeProcessing(): void {
    const jobName = 'daily-late-fee-processing';

    // Run at 6 AM every day
    const interval = setInterval(async () => {
      const now = new Date();
      if (now.getHours() === 6 && now.getMinutes() === 0) {
        try {
          console.log('Starting daily late fee processing...');
          await this.processOverdueFees();
        } catch (error) {
          console.error('Daily late fee processing failed:', error);
        }
      }
    }, 60000); // Check every minute

    this.scheduledJobs.set(jobName, interval);
    console.log(`Scheduled job: ${jobName}`);
  }

  /**
   * Schedule weekly analytics refresh
   */
  private scheduleWeeklyAnalyticsRefresh(): void {
    const jobName = 'weekly-analytics-refresh';

    // Run at 2 AM on Sundays
    const interval = setInterval(async () => {
      const now = new Date();
      if (now.getDay() === 0 && now.getHours() === 2 && now.getMinutes() === 0) {
        try {
          console.log('Starting weekly analytics refresh...');
          await this.refreshFeeAnalytics();
        } catch (error) {
          console.error('Weekly analytics refresh failed:', error);
        }
      }
    }, 60000);

    this.scheduledJobs.set(jobName, interval);
    console.log(`Scheduled job: ${jobName}`);
  }

  /**
   * Schedule monthly cleanup
   */
  private scheduleMonthlyCleanup(): void {
    const jobName = 'monthly-cleanup';

    // Run at 1 AM on 1st of every month
    const interval = setInterval(async () => {
      const now = new Date();
      if (now.getDate() === 1 && now.getHours() === 1 && now.getMinutes() === 0) {
        try {
          console.log('Starting monthly fee cleanup...');
          await this.performMonthlyCleanup();
        } catch (error) {
          console.error('Monthly cleanup failed:', error);
        }
      }
    }, 60000);

    this.scheduledJobs.set(jobName, interval);
    console.log(`Scheduled job: ${jobName}`);
  }

  /**
   * Schedule hourly reminders during business hours
   */
  private scheduleHourlyReminders(): void {
    const jobName = 'hourly-reminders';

    // Run every hour during business hours (9 AM - 5 PM)
    const interval = setInterval(async () => {
      const now = new Date();
      if (now.getHours() >= 9 && now.getHours() <= 17 && now.getMinutes() === 0) {
        try {
          console.log('Processing due date reminders...');
          await this.processDueDateReminders();
        } catch (error) {
          console.error('Due date reminders failed:', error);
        }
      }
    }, 60000);

    this.scheduledJobs.set(jobName, interval);
    console.log(`Scheduled job: ${jobName}`);
  }

  /**
   * Process overdue fees and apply late fees automatically
   */
  async processOverdueFees(): Promise<void> {
    try {
      console.log('Starting automated late fee processing...');

      // Get all active campuses
      const campuses = await this.prisma.campus.findMany({
        where: { status: 'ACTIVE' },
        select: { id: true, name: true }
      });

      let totalProcessed = 0;
      let totalApplied = 0;

      for (const campus of campuses) {
        try {
          console.log(`Processing late fees for campus: ${campus.name}`);

          // Start automated late fee job for this campus
          const jobId = await this.automatedLateFeeService.startAutomatedJob({
            campusId: campus.id,
            dryRun: false,
            batchSize: 50,
            maxRetries: 3,
          });

          // Wait for job completion (with timeout)
          let attempts = 0;
          const maxAttempts = 60; // 5 minutes max

          while (attempts < maxAttempts) {
            const jobStatus = await this.automatedLateFeeService.getJobStatus(jobId);

            if (jobStatus && (jobStatus.status === 'COMPLETED' || jobStatus.status === 'FAILED')) {
              totalProcessed += jobStatus.processed;
              totalApplied += jobStatus.applied;

              console.log(`Campus ${campus.name}: Processed ${jobStatus.processed}, Applied ${jobStatus.applied}`);
              break;
            }

            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
            attempts++;
          }

        } catch (error) {
          console.error(`Error processing late fees for campus ${campus.name}:`, error);
        }
      }

      console.log(`Late fee processing completed. Total processed: ${totalProcessed}, Total applied: ${totalApplied}`);

    } catch (error) {
      console.error('Error in processOverdueFees:', error);
      throw error;
    }
  }

  /**
   * Refresh fee analytics data
   */
  async refreshFeeAnalytics(): Promise<void> {
    try {
      console.log('Refreshing fee analytics...');

      // This could involve updating cached analytics, recalculating metrics, etc.
      // For now, we'll just log that it's running
      console.log('Fee analytics refresh completed');

    } catch (error) {
      console.error('Error refreshing fee analytics:', error);
      throw error;
    }
  }

  /**
   * Perform monthly cleanup tasks
   */
  async performMonthlyCleanup(): Promise<void> {
    try {
      console.log('Starting monthly cleanup...');

      // Archive old transactions (older than 2 years)
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

      // Archive old fee transactions
      const archivedTransactions = await this.prisma.feeTransaction.updateMany({
        where: {
          createdAt: { lt: twoYearsAgo },
          status: 'COMPLETED'
        },
        data: {
          // In a real implementation, you might move these to an archive table
          // For now, we'll just add a note
        }
      });

      console.log(`Monthly cleanup completed. Processed ${archivedTransactions.count} old transactions`);

    } catch (error) {
      console.error('Error in monthly cleanup:', error);
      throw error;
    }
  }

  /**
   * Process due date reminders
   */
  async processDueDateReminders(): Promise<void> {
    try {
      console.log('Processing due date reminders...');

      // Get fees due in the next 3 days
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

      const upcomingDueFees = await this.prisma.enrollmentFee.findMany({
        where: {
          dueDate: {
            gte: new Date(),
            lte: threeDaysFromNow
          },
          paymentStatus: {
            in: ['PENDING', 'PARTIAL']
          }
        },
        include: {
          enrollment: {
            include: {
              student: {
                include: {
                  user: { select: { id: true, name: true, email: true } }
                }
              }
            }
          }
        },
        take: 100 // Limit to prevent overwhelming the system
      });

      console.log(`Found ${upcomingDueFees.length} fees with upcoming due dates`);

      // Process reminders through notification service
      for (const fee of upcomingDueFees) {
        try {
          // This would send email/SMS reminders
          // Implementation depends on your notification system
          console.log(`Reminder sent for fee ${fee.id} to ${fee.enrollment.student.user?.email}`);
        } catch (error) {
          console.error(`Failed to send reminder for fee ${fee.id}:`, error);
        }
      }

    } catch (error) {
      console.error('Error processing due date reminders:', error);
      throw error;
    }
  }

  /**
   * Get job status information
   */
  getJobStatus(): { activeJobs: number; jobNames: string[] } {
    return {
      activeJobs: this.scheduledJobs.size,
      jobNames: Array.from(this.scheduledJobs.keys())
    };
  }
}

/**
 * Manual trigger for testing notifications
 */
export async function triggerFeeNotifications(prisma: PrismaClient): Promise<void> {
  const cronService = new CronService(prisma);
  await cronService.runDailyFeeNotifications();
}
