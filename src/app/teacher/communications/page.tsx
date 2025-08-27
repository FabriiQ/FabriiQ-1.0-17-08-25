/**
 * Teacher Communications Page - Teaching Hub UX
 * Optimized for teacher workflow with inbox groups, quick actions, and message analytics
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  MessageSquare,
  Users,
  GraduationCap,
  SendHorizontal as Send,
  Clock,
  TrendingUp,
  Filter,
  Search,
  Plus,
  Bell,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  User,
  BookOpen,
  HelpCircle,
  Volume2 as Volume,
  Star,
  Archive
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { api } from '@/utils/api';
// Import working messaging components
import { InboxManager } from '@/features/messaging/components/InboxManager';
import { MessageComposer } from '@/features/messaging/components/MessageComposer';
import { MessageInterface } from '@/features/messaging/components/MessageInterface';
import { PrivacyNoticePanel } from '@/features/messaging/components/PrivacyNoticePanel';

export default function TeacherCommunicationsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get teacher's classes for filtering - using available endpoint
  const { data: teacherClasses } = api.class.getMyClasses.useQuery(
    undefined,
    { enabled: !!session?.user?.id }
  );

  // Get unread message count
  const { data: unreadCount } = api.messaging.getUnreadCount.useQuery(
    {},
    {
      refetchInterval: 30000, // 30 seconds
      enabled: !!session?.user
    }
  );

  // Mock teacher message analytics (will be implemented later)
  const messageAnalytics = {
    responseRate: 94,
    avgResponseTime: '2.3',
    messagesSent: 127
  };

  const quickActions = [
    {
      title: 'Send Feedback',
      description: 'Send feedback to students about their work',
      icon: <Star className="h-5 w-5" />,
      action: () => setActiveTab('compose'),
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      title: 'Parent Update',
      description: 'Send progress update to parents',
      icon: <Users className="h-5 w-5" />,
      action: () => setActiveTab('compose'),
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      title: 'Class Announcement',
      description: 'Broadcast message to entire class',
      icon: <Volume className="h-5 w-5" />,
      action: () => setActiveTab('compose'),
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      title: 'Grade Discussion',
      description: 'Discuss grades with students or parents',
      icon: <BookOpen className="h-5 w-5" />,
      action: () => setActiveTab('compose'),
      color: 'bg-amber-50 hover:bg-amber-100'
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teaching Hub</h1>
            <p className="text-muted-foreground">
              Manage your communications with students, parents, and colleagues
            </p>
          </div>
          <Button onClick={() => setActiveTab('compose')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Message
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount?.count || 0}</div>
              <p className="text-xs text-muted-foreground">
                {Math.floor((unreadCount?.count || 0) * 0.2)} priority
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {messageAnalytics?.responseRate || 94}%
              </div>
              <p className="text-xs text-muted-foreground">
                Last 7 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {messageAnalytics?.avgResponseTime || '2.3'}h
              </div>
              <p className="text-xs text-muted-foreground">
                Faster than average
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Student Engagement</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">High</div>
              <p className="text-xs text-muted-foreground">
                Active participation
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
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
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Archive className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-6">
          {/* Filters */}
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
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {teacherClasses?.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Working Inbox Manager */}
          <InboxManager
            role="teacher"
            classFilter={selectedClass === 'all' ? undefined : selectedClass}
            searchQuery={searchQuery}
            focusMode={false}
          />
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common messaging tasks for teachers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-auto p-4 flex flex-col items-start gap-2 ${action.color}`}
                    onClick={action.action}
                  >
                    <div className="flex items-center gap-2">
                      {action.icon}
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left">
                      {action.description}
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
                Send messages to students, parents, or colleagues with built-in compliance features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MessageComposer
                role="teacher"
                availableClasses={teacherClasses || []}
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
              contentCategory: 'EDUCATIONAL',
              riskLevel: 'MEDIUM',
              isEducationalRecord: true,
              encryptionLevel: 'ENHANCED',
              auditRequired: true,
              legalBasis: 'LEGITIMATE_INTEREST',
              dataCategories: ['educational_communication', 'student_data'],
              crossBorderTransfer: false,
              consentRequired: false,
              parentalConsentRequired: false,
            }}
            recipientTypes={['STUDENT', 'PARENT', 'TEACHER']}
            messageType="GROUP"
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Communication Effectiveness</CardTitle>
                <CardDescription>
                  Your messaging performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Messages Sent</p>
                    <p className="text-2xl font-bold">
                      {messageAnalytics?.messagesSent || '127'}
                    </p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Response Rate</p>
                    <p className="text-2xl font-bold">
                      {messageAnalytics?.responseRate || '94'}%
                    </p>
                    <p className="text-xs text-muted-foreground">Above average</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Engagement</CardTitle>
                <CardDescription>
                  How students interact with your messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Read Rate</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      98%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reply Rate</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      76%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Engagement Score</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      High
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
              <CardDescription>
                Manage your messaging settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive email alerts for new messages
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-Reply</p>
                    <p className="text-sm text-muted-foreground">
                      Set automatic responses for common questions
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Message Templates</p>
                    <p className="text-sm text-muted-foreground">
                      Create and manage message templates
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
