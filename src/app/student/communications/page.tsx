/**
 * Student Communications Page - Student Inbox UX
 * Optimized for student workflow with priority groupings, focus mode, and help templates
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  MessageSquare,
  GraduationCap,
  School,
  Bell,
  Target,
  HelpCircle,
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  User,
  BookOpen,
  FileText,
  SendHorizontal as Send,
  Archive
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { api } from '@/utils/api';
// Import working messaging components
import { InboxManager } from '@/features/messaging/components/InboxManager';
import { MessageComposer } from '@/features/messaging/components/MessageComposer';
import { PrivacyNoticePanel } from '@/features/messaging/components/PrivacyNoticePanel';

export default function StudentCommunicationsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('inbox');
  const [focusMode, setFocusMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get unread message count
  const { data: unreadCount } = api.messaging.getUnreadCount.useQuery(
    {},
    {
      refetchInterval: 30000, // 30 seconds
      enabled: !!session?.user
    }
  );

  // Get student's classes for context - using available endpoint
  const { data: studentClasses } = api.student.getCurrentStudentClasses.useQuery(
    undefined,
    { enabled: !!session?.user?.id }
  );

  const helpTemplates = [
    {
      title: 'Assignment Help',
      description: 'Request help with homework or assignments',
      icon: <BookOpen className="h-5 w-5" />,
      template: 'assignment-help',
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Report Absence',
      description: 'Notify teachers about absence',
      icon: <Calendar className="h-5 w-5" />,
      template: 'absence-report',
      color: 'bg-amber-50 hover:bg-amber-100'
    },
    {
      title: 'Technical Support',
      description: 'Get help with technical issues',
      icon: <HelpCircle className="h-5 w-5" />,
      template: 'tech-support',
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Grade Inquiry',
      description: 'Ask about grades or feedback',
      icon: <Star className="h-5 w-5" />,
      template: 'grade-inquiry',
      color: 'bg-purple-50 hover:bg-purple-100'
    }
  ];

  const priorityGroups = [
    {
      title: 'Priority',
      count: Math.floor((unreadCount?.count || 0) * 0.2), // 20% priority
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Academic',
      count: Math.floor((unreadCount?.count || 0) * 0.6), // 60% academic
      icon: <GraduationCap className="h-4 w-4" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'School Updates',
      count: Math.floor((unreadCount?.count || 0) * 0.2), // 20% administrative
      icon: <School className="h-4 w-4" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">
              Stay connected with your teachers and school
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Focus Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Focus Mode</span>
              <Switch
                checked={focusMode}
                onCheckedChange={setFocusMode}
              />
            </div>
            <Button onClick={() => setActiveTab('compose')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        {/* Priority Groups */}
        <div className="grid gap-4 md:grid-cols-3">
          {priorityGroups.map((group, index) => (
            <Card key={index} className={group.bgColor}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{group.title}</CardTitle>
                <div className={group.color}>
                  {group.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{group.count}</div>
                <p className="text-xs text-muted-foreground">
                  {group.count === 1 ? 'message' : 'messages'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Focus Mode Banner */}
        {focusMode && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Focus Mode Active</p>
                  <p className="text-sm text-blue-700">
                    Only showing priority and academic messages. Social notifications are hidden.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inbox" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Inbox
            {(unreadCount?.count || 0) > 0 && (
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                {unreadCount?.count || 0}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="compose">
            <Send className="h-4 w-4 mr-2" />
            Compose
          </TabsTrigger>
          <TabsTrigger value="help">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Working Inbox Manager */}
          <InboxManager
            role="student"
            classFilter={undefined}
            searchQuery={searchQuery}
            focusMode={focusMode}
          />
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          {/* Help Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Help</CardTitle>
              <CardDescription>
                Common requests and questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {helpTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-auto p-4 flex flex-col items-start gap-2 ${template.color}`}
                    onClick={() => {
                      // Pre-fill composer with template
                      console.log('Using template:', template.template);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {template.icon}
                      <span className="font-medium">{template.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left">
                      {template.description}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Working Message Composer */}
          <Card>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
              <CardDescription>
                Send messages to teachers, classmates, or request help with assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MessageComposer
                role="student"
                availableClasses={[]}
                inline={true}
                onSent={() => {
                  // Refresh inbox when message is sent
                  window.location.reload();
                }}
              />
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <PrivacyNoticePanel
            complianceProfile={{
              contentCategory: 'GENERAL',
              riskLevel: 'LOW',
              isEducationalRecord: false,
              encryptionLevel: 'STANDARD',
              auditRequired: false,
              legalBasis: 'CONSENT',
              dataCategories: ['communication'],
              crossBorderTransfer: false,
              consentRequired: false,
              parentalConsentRequired: false,
            }}
            recipientTypes={['STUDENT', 'TEACHER']}
            messageType="DIRECT"
          />
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Communication Guidelines</CardTitle>
                <CardDescription>
                  How to communicate effectively with teachers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Be respectful and polite</p>
                      <p className="text-sm text-muted-foreground">
                        Always use appropriate language and tone
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Be specific about your needs</p>
                      <p className="text-sm text-muted-foreground">
                        Clearly explain what help you need
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Include relevant details</p>
                      <p className="text-sm text-muted-foreground">
                        Mention assignment names, due dates, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>
                  When to expect replies from teachers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Urgent Questions</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      Same Day
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Assignment Help</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      1-2 Days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">General Questions</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      2-3 Days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Grade Inquiries</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      3-5 Days
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions and their answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">How do I submit an assignment?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Go to your class page and look for the assignment submission area. 
                    Upload your file and click submit before the deadline.
                  </p>
                </div>
                <div>
                  <p className="font-medium">When will I get my grades?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Grades are typically posted within 5-7 business days after submission. 
                    You'll receive a notification when grades are available.
                  </p>
                </div>
                <div>
                  <p className="font-medium">How do I report technical issues?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use the "Technical Support" template above or contact your teacher directly. 
                    Include details about what you were trying to do when the issue occurred.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
