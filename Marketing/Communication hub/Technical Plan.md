Based on the requirements to remove AI features and add proper compliance/moderation pages for System Admin and Campus Admin, here's the updated **Technical Implementation Plan** without AI dependencies:

## **🏗️ Revised Technical Implementation Plan (Non-AI)**

### **Phase 1: Core Infrastructure (Week 1-2)**

#### **1.1 Database Schema Extensions**

```typescript
// Extend existing social wall schema in prisma/schema.prisma
model Message extends BaseSocialPost {
  // Extend existing SocialPost model
  messageType        MessageType   @default(PUBLIC)
  threadId          String?
  parentMessageId   String?
  recipients        MessageRecipient[]
  
  // Compliance fields
  consentRequired       Boolean      @default(false)
  consentObtained      Boolean      @default(true)
  legalBasis           LegalBasis   @default(LEGITIMATE_INTEREST)
  dataCategories       String[]
  retentionPolicyId    String?
  encryptionLevel      EncryptionLevel @default(STANDARD)
  auditRequired        Boolean      @default(false)
  crossBorderTransfer  Boolean      @default(false)
  
  // Smart classification (rule-based)
  contentCategory      ContentCategory @default(GENERAL)
  riskLevel           RiskLevel    @default(LOW)
  moderationStatus    ModerationStatus @default(APPROVED)
  flaggedKeywords     String[]     // Store matched keywords
  
  // Educational compliance
  isEducationalRecord         Boolean @default(false)
  directoryInformationLevel   DirectoryLevel @default(PUBLIC)
  parentalConsentRequired    Boolean @default(false)
  disclosureLoggingRequired  Boolean @default(false)
  
  // Moderation fields
  moderatedAt          DateTime?
  moderatedBy          String?
  moderationNotes      String?
  escalatedAt          DateTime?
  escalatedTo          String?
  
  // Relationships
  retentionPolicy    RetentionPolicy? @relation(fields: [retentionPolicyId], references: [id])
  auditLogs         MessageAuditLog[]
  moderator         User? @relation("ModeratedMessages", fields: [moderatedBy], references: [id])
}

enum ContentCategory {
  GENERAL
  ACADEMIC
  ADMINISTRATIVE
  SUPPORT
  EMERGENCY
  ACHIEVEMENT
  BEHAVIORAL
}

enum RiskLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum ModerationStatus {
  APPROVED
  PENDING
  FLAGGED
  BLOCKED
  ESCALATED
}
```

#### **1.2 Rule-Based Message Classification Engine**

```typescript
// src/features/messaging/core/RuleBasedClassifier.ts
export class RuleBasedMessageClassifier {
  private static readonly KEYWORD_CATEGORIES = {
    academic: ['assignment', 'homework', 'quiz', 'test', 'grade', 'exam', 'study', 'lesson'],
    administrative: ['fee', 'payment', 'enrollment', 'schedule', 'policy', 'meeting'],
    support: ['help', 'problem', 'issue', 'struggling', 'difficulty', 'confused'],
    emergency: ['urgent', 'emergency', 'immediate', 'crisis', 'safety'],
    behavioral: ['behavior', 'discipline', 'concern', 'incident', 'report'],
    achievement: ['congratulations', 'excellent', 'outstanding', 'achievement', 'success']
  };

  private static readonly RISK_KEYWORDS = {
    high: ['bullying', 'harassment', 'threat', 'inappropriate', 'violence'],
    medium: ['concern', 'worried', 'problem', 'struggling', 'difficulty'],
    low: ['question', 'clarification', 'information', 'update']
  };

  classifyMessage(content: string, sender: User, recipients: User[]): MessageClassification {
    const lowerContent = content.toLowerCase();
    
    // Classify content category
    const contentCategory = this.classifyContentCategory(lowerContent);
    
    // Assess risk level
    const riskLevel = this.assessRiskLevel(lowerContent);
    
    // Determine compliance requirements
    const complianceLevel = this.determineComplianceLevel(contentCategory, sender, recipients);
    
    // Check for educational records
    const isEducationalRecord = this.detectEducationalContent(lowerContent, contentCategory);
    
    return {
      contentCategory,
      riskLevel,
      complianceLevel,
      isEducationalRecord,
      flaggedKeywords: this.extractFlaggedKeywords(lowerContent),
      moderationRequired: riskLevel === 'HIGH' || riskLevel === 'CRITICAL',
      auditRequired: isEducationalRecord || complianceLevel === 'high'
    };
  }

  private classifyContentCategory(content: string): ContentCategory {
    for (const [category, keywords] of Object.entries(this.KEYWORD_CATEGORIES)) {
      if (keywords.some(keyword => content.includes(keyword))) {
        return category.toUpperCase() as ContentCategory;
      }
    }
    return ContentCategory.GENERAL;
  }

  private assessRiskLevel(content: string): RiskLevel {
    if (this.RISK_KEYWORDS.high.some(keyword => content.includes(keyword))) {
      return RiskLevel.CRITICAL;
    }
    if (this.RISK_KEYWORDS.medium.some(keyword => content.includes(keyword))) {
      return RiskLevel.MEDIUM;
    }
    return RiskLevel.LOW;
  }
}
```

### **Phase 2: System Admin & Campus Admin Pages (Week 2-3)**

#### **2.1 System Admin Compliance Dashboard**

```typescript
// src/pages/system-admin/compliance/index.tsx
import { ComplianceDashboard } from '@/features/compliance/components/ComplianceDashboard';
import { ModerationPanel } from '@/features/moderation/components/ModerationPanel';
import { SystemAdminLayout } from '@/layouts/SystemAdminLayout';

export default function SystemAdminCompliancePage() {
  return (
    <SystemAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Compliance & Communication Management</h1>
          <ComplianceActions />
        </div>
        
        {/* System-wide Compliance Overview */}
        <ComplianceOverviewGrid />
        
        {/* Real-time Monitoring */}
        <div className="grid grid-cols-2 gap-6">
          <ComplianceDashboard scope="system-wide" />
          <ModerationPanel scope="all-campuses" />
        </div>
        
        {/* Detailed Analytics */}
        <ComplianceAnalytics />
      </div>
    </SystemAdminLayout>
  );
}
```

#### **2.2 Campus Admin Communication Management**

```typescript
// src/pages/campus-admin/communications/index.tsx
import { CampusCommunicationHub } from '@/features/messaging/components/CampusCommunicationHub';
import { CampusAdminLayout } from '@/layouts/CampusAdminLayout';

export default function CampusAdminCommunicationsPage() {
  const { campusId } = useCampusAdmin();
  
  return (
    <CampusAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Campus Communications</h1>
          <CampusMessageActions campusId={campusId} />
        </div>
        
        {/* Campus Communication Overview */}
        <CampusCommunicationStats campusId={campusId} />
        
        {/* Unified Communication Hub */}
        <CampusCommunicationHub campusId={campusId} />
        
        {/* Campus-specific Moderation */}
        <CampusModerationPanel campusId={campusId} />
      </div>
    </CampusAdminLayout>
  );
}
```

#### **2.3 Compliance Dashboard Components**

```typescript
// src/features/compliance/components/ComplianceDashboard.tsx
interface ComplianceDashboardProps {
  scope: 'system-wide' | 'campus' | 'class';
  campusId?: string;
  classId?: string;
}

export function ComplianceDashboard({ scope, campusId, classId }: ComplianceDashboardProps) {
  const { data: complianceStats } = api.compliance.getStats.useQuery({ scope, campusId, classId });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Compliance Dashboard
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <ComplianceMetric 
            label="Messages Today"
            value={complianceStats?.messagesProcessed || 0}
            trend="+12%"
            status="good"
          />
          <ComplianceMetric 
            label="Compliance Rate"
            value={`${complianceStats?.complianceRate || 100}%`}
            status={complianceStats?.complianceRate > 99 ? 'good' : 'warning'}
          />
          <ComplianceMetric 
            label="FERPA Protected"
            value={complianceStats?.ferpaProtectedCount || 0}
            status="good"
          />
          <ComplianceMetric 
            label="Audit Entries"
            value={complianceStats?.auditEntries || 0}
            status="good"
          />
        </div>
        
        {/* Compliance Breakdown */}
        <ComplianceBreakdown data={complianceStats?.breakdown} />
        
        {/* Recent Activity */}
        <RecentComplianceActivity activities={complianceStats?.recentActivities} />
        
        {/* Alerts */}
        <ComplianceAlerts alerts={complianceStats?.alerts} />
      </CardContent>
    </Card>
  );
}
```

### **Phase 3: Enhanced Moderation System (Week 3-4)**

#### **3.1 Extend Existing Moderation for Messages**

```typescript
// src/features/moderation/components/MessageModerationPanel.tsx
// Extend existing moderation components for messages

export function MessageModerationPanel({ scope, campusId }: ModerationPanelProps) {
  const { data: flaggedMessages } = api.moderation.getFlaggedMessages.useQuery({ scope, campusId });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Moderation</CardTitle>
        <div className="flex gap-2">
          <ModerationFilter />
          <ModerationSearch />
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Moderation Queue */}
        <div className="space-y-4">
          {flaggedMessages?.map((message) => (
            <MessageModerationCard 
              key={message.id}
              message={message}
              onModerate={handleModeration}
              onEscalate={handleEscalation}
            />
          ))}
        </div>
        
        {/* Bulk Actions */}
        <ModerationBulkActions />
      </CardContent>
    </Card>
  );
}

// Extend existing moderation card for messages
function MessageModerationCard({ message, onModerate, onEscalate }: MessageModerationCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      {/* Message Info */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={getRiskVariant(message.riskLevel)}>
              {message.riskLevel}
            </Badge>
            <Badge variant="outline">{message.contentCategory}</Badge>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            From: {message.sender.name} • To: {message.recipients.length} recipients
          </p>
        </div>
        <span className="text-xs text-gray-500">
          {formatDistanceToNow(message.createdAt)} ago
        </span>
      </div>
      
      {/* Message Content */}
      <div className="bg-gray-50 p-3 rounded border">
        <p className="text-sm">{message.content}</p>
        {message.flaggedKeywords.length > 0 && (
          <div className="mt-2">
            <span className="text-xs font-medium">Flagged Keywords:</span>
            <div className="flex gap-1 mt-1">
              {message.flaggedKeywords.map((keyword) => (
                <Badge key={keyword} variant="destructive" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Compliance Info */}
      {message.isEducationalRecord && (
        <div className="bg-blue-50 border border-blue-200 p-2 rounded">
          <p className="text-xs text-blue-800">
            🛡️ FERPA Protected Educational Record
          </p>
        </div>
      )}
      
      {/* Moderation Actions */}
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onModerate(message.id, 'approved')}
        >
          Approve
        </Button>
        <Button 
          size="sm" 
          variant="destructive"
          onClick={() => onModerate(message.id, 'blocked')}
        >
          Block
        </Button>
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => onEscalate(message.id)}
        >
          Escalate
        </Button>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => viewMessageThread(message.threadId)}
        >
          View Thread
        </Button>
      </div>
    </div>
  );
}
```

### **Phase 4: Smart Message Features (Non-AI) (Week 4-5)**

#### **4.1 Context-Based Recipient Suggestions**

```typescript
// src/features/messaging/hooks/useContextualRecipients.ts
export function useContextualRecipients(classId: string, role: UserRole) {
  const { data: contextData } = api.context.getCurrentContext.useQuery({ classId });
  
  const suggestions = useMemo(() => {
    if (!contextData) return [];
    
    const baseSuggestions = [];
    
    // Context-based suggestions (rule-based)
    if (contextData.currentActivity) {
      // Suggest activity-related contacts
      baseSuggestions.push({
        type: 'activity_teacher',
        user: contextData.currentActivity.teacher,
        reason: `Teaching ${contextData.currentActivity.title}`
      });
    }
    
    if (contextData.currentClass) {
      // Suggest class-related contacts
      baseSuggestions.push(
        ...contextData.currentClass.students.map(student => ({
          type: 'classmate',
          user: student,
          reason: `Classmate in ${contextData.currentClass.name}`
        }))
      );
    }
    
    // Role-based filtering
    return filterSuggestionsByRole(baseSuggestions, role);
  }, [contextData, role]);
  
  return { suggestions };
}
```

#### **4.2 Template-Based Message Composition**

```typescript
// src/features/messaging/components/MessageTemplates.tsx
export function MessageTemplates({ role, context, onSelectTemplate }: MessageTemplatesProps) {
  const templates = useMemo(() => {
    const baseTemplates = MESSAGE_TEMPLATES[role] || [];
    
    // Filter templates based on context
    if (context?.type === 'assignment') {
      return baseTemplates.filter(t => t.category === 'academic');
    }
    
    if (context?.type === 'grade') {
      return baseTemplates.filter(t => ['academic', 'parent_communication'].includes(t.category));
    }
    
    return baseTemplates;
  }, [role, context]);
  
  return (
    <div className="grid grid-cols-2 gap-2">
      {templates.map((template) => (
        <Button
          key={template.id}
          variant="outline"
          size="sm"
          onClick={() => onSelectTemplate(template)}
          className="text-left justify-start h-auto p-3"
        >
          <div>
            <div className="font-medium text-xs">{template.title}</div>
            <div className="text-xs text-gray-500 mt-1">{template.preview}</div>
          </div>
        </Button>
      ))}
    </div>
  );
}

// Pre-defined message templates by role
const MESSAGE_TEMPLATES = {
  student: [
    {
      id: 'assignment_help',
      category: 'academic',
      title: 'Assignment Help Request',
      preview: 'I need help with...',
      template: 'Dear {teacher_name},\n\nI am having difficulty with {assignment_name}. Could you please help me understand {specific_question}?\n\nThank you,\n{student_name}'
    },
    {
      id: 'absence_report',
      category: 'administrative',
      title: 'Report Absence',
      preview: 'I will be absent...',
      template: 'Dear {teacher_name},\n\nI will be absent from class on {date} due to {reason}. Please let me know if I miss any important announcements.\n\nThank you,\n{student_name}'
    }
  ],
  teacher: [
    {
      id: 'grade_feedback',
      category: 'academic',
      title: 'Grade Feedback',
      preview: 'Your grade for...',
      template: 'Dear {student_name},\n\nYour grade for {assignment_name} is {grade}. {feedback_details}\n\nKeep up the good work!\n\n{teacher_name}'
    },
    {
      id: 'parent_update',
      category: 'parent_communication',
      title: 'Parent Progress Update',
      preview: 'Progress update for...',
      template: 'Dear {parent_name},\n\nI wanted to update you on {student_name}\'s progress in {subject}. {progress_details}\n\nPlease let me know if you have any questions.\n\nBest regards,\n{teacher_name}'
    }
  ]
};
```

### **Phase 5: Cron Job for Message Analysis (Week 5)**

#### **5.1 Message Analysis Cron Job**

```typescript
// src/lib/cron/messageAnalysis.ts
import { CronJob } from 'cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const messageAnalysisCronJob = new CronJob('0 */6 * * *', async () => {
  console.log('Running message analysis cron job...');
  
  try {
    // Analyze messages from the last 6 hours
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    
    const recentMessages = await prisma.message.findMany({
      where: {
        createdAt: { gte: sixHoursAgo },
        analyzedAt: null
      },
      include: {
        sender: true,
        recipients: { include: { user: true } }
      }
    });
    
    for (const message of recentMessages) {
      // Perform rule-based analysis
      const analysis = await analyzeMessage(message);
      
      // Update message with analysis results
      await prisma.message.update({
        where: { id: message.id },
        data: {
          contentCategory: analysis.contentCategory,
          riskLevel: analysis.riskLevel,
          flaggedKeywords: analysis.flaggedKeywords,
          moderationStatus: analysis.requiresModeration ? 'PENDING' : 'APPROVED',
          analyzedAt: new Date()
        }
      });
      
      // Create audit log
      await prisma.messageAuditLog.create({
        data: {
          messageId: message.id,
          action: 'ANALYZED',
          details: JSON.stringify(analysis),
          timestamp: new Date()
        }
      });
      
      // Flag for moderation if needed
      if (analysis.requiresModeration) {
        await flagForModeration(message, analysis);
      }
    }
    
    console.log(`Analyzed ${recentMessages.length} messages`);
  } catch (error) {
    console.error('Error in message analysis cron job:', error);
  }
});

async function analyzeMessage(message: any): Promise<MessageAnalysis> {
  const classifier = new RuleBasedMessageClassifier();
  return classifier.classifyMessage(message.content, message.sender, message.recipients.map(r => r.user));
}

async function flagForModeration(message: any, analysis: MessageAnalysis) {
  // Create moderation queue entry
  await prisma.moderationQueue.create({
    data: {
      messageId: message.id,
      reason: `Risk level: ${analysis.riskLevel}`,
      flaggedKeywords: analysis.flaggedKeywords,
      priority: analysis.riskLevel === 'CRITICAL' ? 'HIGH' : 'MEDIUM',
      status: 'PENDING'
    }
  });
  
  // Notify moderators if critical
  if (analysis.riskLevel === 'CRITICAL') {
    await notifyModerators(message, analysis);
  }
}
```

### **Phase 6: Integration with Existing System (Week 6)**

#### **6.1 Extend Social Wall Container**

```typescript
// src/features/social-wall/components/SocialWallContainer.tsx
// Extend existing component without breaking changes

export function SocialWallContainer({ 
  classId, 
  enableMessaging = true,
  defaultView = 'feed',
  ...existingProps 
}: EnhancedSocialWallProps) {
  const [activeTab, setActiveTab] = useState(defaultView);
  
  // Preserve existing social wall functionality
  const existingSocialWallLogic = useSocialWallLogic(classId, existingProps);
  
  // Add messaging capabilities
  const { unreadCount, messagingEnabled } = useMessagingCapabilities(classId, enableMessaging);
  
  return (
    <div className="social-wall-container">
      {/* Enhanced Header - preserves existing design */}
      <EnhancedSocialWallHeader 
        {...existingSocialWallLogic.headerProps}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadCount={unreadCount}
        enableMessaging={messagingEnabled}
      />
      
      {/* Content Area - switches between existing and new functionality */}
      <div className="content-container">
        {activeTab === 'feed' && (
          <ExistingPostFeed {...existingSocialWallLogic.feedProps} />
        )}
        {activeTab === 'messages' && messagingEnabled && (
          <MessageInterface classId={classId} />
        )}
        {activeTab === 'focus' && (
          <FocusModeInterface classId={classId} />
        )}
      </div>
    </div>
  );
}
```

## **🎯 Key Changes from Original Plan**

### **1. Removed AI Dependencies**
- **No AI-powered classification**: Using rule-based keyword matching instead
- **No AI message suggestions**: Using template-based composition
- **No AI content analysis**: Using predefined keyword categories
- **Cron job for analysis**: Simple rule-based analysis running every 6 hours

### **2. Added Proper Admin Pages**
- **System Admin Compliance Dashboard**: `/system-admin/compliance`
- **Campus Admin Communication Hub**: `/campus-admin/communications`
- **Integrated with existing admin layouts**
- **Reuses existing moderation components**

### **3. Enhanced Moderation System**
- **Extends existing moderation infrastructure**
- **Rule-based message flagging**
- **Manual review workflows**
- **Escalation paths for high-risk content**

### **4. Smart Features (Non-AI)**
- **Context-based recipient suggestions**: Based on current class/activity
- **Template-based composition**: Pre-defined templates by role
- **Rule-based classification**: Keyword matching for categories
- **Smart notification management**: Time-based and priority-based

This implementation provides a comprehensive messaging system with compliance and moderation capabilities while maintaining compatibility with your existing codebase and avoiding AI dependencies.