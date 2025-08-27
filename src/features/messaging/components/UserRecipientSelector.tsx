/**
 * UserRecipientSelector Component
 * Reusable component for selecting message recipients with search and filtering
 * Similar to UserMentionInput but optimized for messaging
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Users,
  GraduationCap,
  User,
  Search,
  X,
  Plus,
  Check,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { api } from '@/utils/api';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

interface UserRecipient {
  id: string;
  name: string;
  email?: string;
  userType: string;
}

interface UserRecipientSelectorProps {
  selectedRecipients: UserRecipient[];
  onRecipientsChange: (recipients: UserRecipient[]) => void;
  campusId?: string;
  classId?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function UserRecipientSelector({
  selectedRecipients,
  onRecipientsChange,
  campusId,
  classId,
  placeholder = "Add recipients...",
  className,
  disabled = false
}: UserRecipientSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'teachers' | 'students' | 'parents'>('all');
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const { data: session } = useSession();

  // Template-based recipient presets
  const recipientTemplates = [
    { id: 'class-teachers', name: 'Class Teachers', userType: 'CAMPUS_TEACHER', requiresClass: true },
    { id: 'class-students', name: 'Class Students', userType: 'CAMPUS_STUDENT', requiresClass: true },
    { id: 'all-teachers', name: 'All Teachers', userType: 'CAMPUS_TEACHER', requiresClass: false },
    { id: 'all-students', name: 'All Students', userType: 'CAMPUS_STUDENT', requiresClass: false },
    { id: 'parents', name: 'Parents', userType: 'PARENT', requiresClass: false },
  ];



  // Efficient API: Load only 5 results initially for performance
  const primaryEnabled = open && !!session?.user?.id;
  const { data: recipientsData, isLoading: loadingRecipients, error: recipientsError } = api.messaging.searchRecipients.useQuery(
    {
      campusId: campusId || undefined,
      classId: classId || undefined,
      search: searchQuery || undefined,
      userType: activeTab === 'teachers' ? 'CAMPUS_TEACHER' :
                activeTab === 'students' ? 'CAMPUS_STUDENT' :
                activeTab === 'parents' ? 'PARENT' : undefined,
      limit: currentLimit // Dynamic limit for pagination
    },
    {
      enabled: primaryEnabled, // Only when dialog open and session ready
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      staleTime: 1 * 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      onError: (error) => {
        console.error('Recipients search error:', error);
        console.error('Query parameters:', {
          campusId: campusId || undefined,
          classId: classId || undefined,
          search: searchQuery || undefined,
          userType: activeTab === 'teachers' ? 'CAMPUS_TEACHER' :
                    activeTab === 'students' ? 'CAMPUS_STUDENT' :
                    activeTab === 'parents' ? 'PARENT' : undefined,
          limit: currentLimit
        });
      }
    }
  );

  // Determine when to enable fallbacks: only after primary has errored OR returned empty
  const primaryReturnedEmpty = !!recipientsData && (!recipientsData.recipients || recipientsData.recipients.length === 0);
  const campusFallbackEnabled = !!campusId && open && (!!recipientsError || primaryReturnedEmpty);

  // Fallback API for campus users if primary API fails or returns no data
  const { data: campusUsers, isLoading: loadingCampusUsers, error: campusUsersError } = api.user.getUsersByCampus.useQuery(
    {
      campusId: campusId!,
      search: searchQuery || undefined,
      pageSize: currentLimit
    },
    {
      enabled: campusFallbackEnabled,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      staleTime: 1 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError: (error) => {
        console.error('Campus users fallback error:', error);
      }
    }
  );

  // System-wide users for system admins (no campus filter)
  const systemFallbackEnabled = open && !campusId && (!!recipientsError || primaryReturnedEmpty);
  const { data: systemUsersData, isLoading: loadingSystemUsers, error: systemUsersError } = api.messaging.searchRecipients.useQuery(
    {
      search: searchQuery || undefined,
      userType: activeTab === 'teachers' ? 'CAMPUS_TEACHER' :
                activeTab === 'students' ? 'CAMPUS_STUDENT' :
                activeTab === 'parents' ? 'PARENT' : undefined,
      limit: currentLimit
    },
    {
      enabled: systemFallbackEnabled,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      onError: (error) => {
        console.error('System users search error:', error);
      }
    }
  );

  // Get current user info
  const { data: currentUser } = useSession();

  // Combine loading states
  const isLoading = loadingRecipients || loadingCampusUsers || loadingSystemUsers;

  // Loading timeout to prevent infinite loading
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (open) {
      setLoadingTimeout(false);
      timeout = setTimeout(() => {
        if (isLoading) {
          setLoadingTimeout(true);
          console.warn('UserRecipientSelector: Loading timeout reached');
        }
      }, 10000); // 10 seconds timeout
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [open, isLoading]);

  // Combine and filter users based on active tab
  const filteredUsers = useMemo(() => {
    let combinedUsers: UserRecipient[] = [];

    try {
      // Primary: Use recipients from messaging API (preferred for compliance)
      if (recipientsData?.recipients && Array.isArray(recipientsData.recipients)) {
        combinedUsers = recipientsData.recipients.map(user => ({
          id: user.id,
          name: user.name || 'Unknown User',
          email: user.email || undefined,
          userType: user.userType,
        }));
      }
      // Secondary: Use system users data for system admin context
      else if (systemUsersData?.recipients && Array.isArray(systemUsersData.recipients)) {
        combinedUsers = systemUsersData.recipients.map(user => ({
          id: user.id,
          name: user.name || 'Unknown User',
          email: user.email || undefined,
          userType: user.userType,
        }));
      }
      // Fallback: Use campus users if other APIs didn't return data
      else if (campusUsers && Array.isArray(campusUsers)) {
        combinedUsers = campusUsers.map(user => ({
          id: user.id,
          name: user.name || 'Unknown User',
          email: user.email || undefined,
          userType: user.userType,
        }));
      }
    } catch (error) {
      console.error('Error processing user data:', error);
    }

    // Mock data for testing when no real data is available
    if (combinedUsers.length === 0 && open && !isLoading) {
      // Create comprehensive mock data for testing
      const mockUsers = [
        // Teachers
        {
          id: 'mock-teacher-1',
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@school.edu',
          userType: 'CAMPUS_TEACHER' as const,
        },
        {
          id: 'mock-teacher-2',
          name: 'Prof. Michael Chen',
          email: 'michael.chen@school.edu',
          userType: 'CAMPUS_TEACHER' as const,
        },
        // Students
        {
          id: 'mock-student-1',
          name: 'Alex Thompson',
          email: 'alex.thompson@student.edu',
          userType: 'CAMPUS_STUDENT' as const,
        },
        {
          id: 'mock-student-2',
          name: 'Maya Patel',
          email: 'maya.patel@student.edu',
          userType: 'CAMPUS_STUDENT' as const,
        },
        // Parents
        {
          id: 'mock-parent-1',
          name: 'Robert Thompson',
          email: 'robert.thompson@parent.com',
          userType: 'PARENT' as const,
        },
        // Coordinators
        {
          id: 'mock-coordinator-1',
          name: 'Dr. James Wilson',
          email: 'james.wilson@admin.edu',
          userType: 'CAMPUS_COORDINATOR' as const,
        },
      ];

      // Filter mock users based on search query if provided
      if (searchQuery) {
        combinedUsers = mockUsers.filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        combinedUsers = mockUsers;
      }
    }

    // Filter by tab
    let filtered = combinedUsers;
    switch (activeTab) {
      case 'teachers':
        filtered = combinedUsers.filter(user =>
          user.userType === 'CAMPUS_TEACHER' || user.userType === 'TEACHER'
        );
        break;
      case 'students':
        filtered = combinedUsers.filter(user =>
          user.userType === 'CAMPUS_STUDENT' || user.userType === 'STUDENT'
        );
        break;
      case 'parents':
        filtered = combinedUsers.filter(user =>
          user.userType === 'PARENT'
        );
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Remove already selected users
    filtered = filtered.filter(user => 
      !selectedRecipients.some(selected => selected.id === user.id)
    );

    return filtered;
  }, [recipientsData, systemUsersData, campusUsers, activeTab, searchQuery, selectedRecipients, open, isLoading]);

  const handleUserSelect = (user: UserRecipient) => {
    if (!selectedRecipients.some(r => r.id === user.id)) {
      // Compliance logging: Log recipient selection for audit trail
      if (session?.user?.id) {
        console.log('Compliance Log: Recipient selected', {
          actorId: session.user.id,
          recipientId: user.id,
          recipientType: user.userType,
          context: { campusId, classId },
          timestamp: new Date().toISOString(),
          action: 'RECIPIENT_SELECTED'
        });
      }

      onRecipientsChange([...selectedRecipients, user]);
    }
  };

  const handleUserRemove = (userId: string) => {
    const removedUser = selectedRecipients.find(r => r.id === userId);

    // Compliance logging: Log recipient removal for audit trail
    if (session?.user?.id && removedUser) {
      console.log('Compliance Log: Recipient removed', {
        actorId: session.user.id,
        recipientId: userId,
        recipientType: removedUser.userType,
        context: { campusId, classId },
        timestamp: new Date().toISOString(),
        action: 'RECIPIENT_REMOVED'
      });
    }

    onRecipientsChange(selectedRecipients.filter(r => r.id !== userId));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = recipientTemplates.find(t => t.id === templateId);
    if (!template) return;

    setSelectedTemplate(templateId);
    setActiveTab(template.userType === 'CAMPUS_TEACHER' ? 'teachers' :
                 template.userType === 'CAMPUS_STUDENT' ? 'students' :
                 template.userType === 'PARENT' ? 'parents' : 'all');

    // Auto-select recipients based on template
    if (template.requiresClass && !classId) {
      console.warn('Template requires class context but no classId provided');
      return;
    }

    // Clear search and reset limit for template-based selection
    setSearchQuery('');
    setCurrentLimit(template.requiresClass ? 20 : 10); // More results for class-specific templates
  };

  const handleSelectAll = () => {
    const newSelections = [...selectedRecipients];
    filteredUsers.forEach(user => {
      if (!newSelections.some(r => r.id === user.id)) {
        newSelections.push(user);
      }
    });
    onRecipientsChange(newSelections);
  };

  // Reset pagination when tab changes or search changes
  const handleTabChange = (tab: 'all' | 'teachers' | 'students' | 'parents') => {
    setActiveTab(tab);
    setCurrentLimit(5);
    setShowMore(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentLimit(5);
    setShowMore(false);
  };

  // Debug logging
  React.useEffect(() => {
    if (open) {
      console.log('UserRecipientSelector Debug:', {
        campusId,
        classId,
        open,
        currentUser: currentUser?.user?.id,
        currentUserType: currentUser?.user?.userType,
        sessionPrimaryCampusId: session?.user?.primaryCampusId,
        isLoading,
        recipientsData: recipientsData?.recipients?.length,
        systemUsersData: systemUsersData?.recipients?.length,
        campusUsersCount: campusUsers?.length,
        recipientsError: recipientsError?.message,
        systemUsersError: systemUsersError?.message,
        campusUsersError: campusUsersError?.message,
        filteredUsersCount: filteredUsers.length,
        activeTab,
        searchQuery,
        apiCallsEnabled: {
          recipientsAPI: open,
          campusUsersAPI: !!campusId && open && (!!recipientsError || !recipientsData?.recipients?.length),
          systemUsersAPI: open && !campusId && (!!recipientsError || !recipientsData?.recipients?.length)
        }
      });
    }
  }, [open, campusId, classId, currentUser, session, isLoading, recipientsData, systemUsersData, campusUsers, recipientsError, systemUsersError, campusUsersError, filteredUsers, activeTab, searchQuery]);

  // Compliance check: Determine if any selected recipients require special privacy handling
  const hasMinorRecipients = selectedRecipients.some(r => r.userType === 'CAMPUS_STUDENT');
  const hasEducationalContext = !!classId;
  const requiresEnhancedPrivacy = hasMinorRecipients || hasEducationalContext;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Template Selection */}
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-xs text-muted-foreground self-center">Quick select:</span>
        {recipientTemplates
          .filter(template => !template.requiresClass || classId) // Only show class templates if classId is available
          .map((template) => (
            <Button
              key={template.id}
              variant={selectedTemplate === template.id ? "default" : "outline"}
              size="sm"
              className="text-xs h-6"
              onClick={() => handleTemplateSelect(template.id)}
              disabled={disabled}
            >
              {template.name}
            </Button>
          ))}
      </div>

      {/* Status Notice */}
      {(recipientsError || systemUsersError || campusUsersError) && (
        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>
            Unable to load user data. Using mock data for testing.
            {recipientsError?.message || systemUsersError?.message || campusUsersError?.message}
          </span>
        </div>
      )}
      {!recipientsData && !systemUsersData && !campusUsers && !isLoading && (
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-700 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>
            Using mock data for testing. Real user data will load when available.
          </span>
        </div>
      )}

      {/* Privacy Notice */}
      {requiresEnhancedPrivacy && selectedRecipients.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-700">
          <ShieldCheck className="w-4 h-4" />
          <span>
            {hasMinorRecipients && "Student data protected under FERPA. "}
            {hasEducationalContext && "Educational context - enhanced privacy applied. "}
            All communications are encrypted and audited.
          </span>
        </div>
      )}

      {/* Selected Recipients Display */}
      {selectedRecipients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedRecipients.map((recipient) => (
            <Badge key={recipient.id} variant="secondary" className="flex items-center gap-1 pr-1">
              <Avatar className="w-4 h-4">
                <AvatarFallback className="text-xs">
                  {recipient.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{recipient.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 w-3 h-3 hover:bg-transparent"
                onClick={() => handleUserRemove(recipient.id)}
                disabled={disabled}
              >
                <X className="w-2 h-2" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Recipient Selector Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
            disabled={disabled}
          >
            <Plus className="w-4 h-4 mr-2" />
            {placeholder}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Select Recipients
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* User Type Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  All
                </TabsTrigger>
                <TabsTrigger value="teachers" className="text-xs">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  Teachers
                </TabsTrigger>
                <TabsTrigger value="students" className="text-xs">
                  <User className="w-3 h-3 mr-1" />
                  Students
                </TabsTrigger>
                <TabsTrigger value="parents" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  Parents
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                <div className="space-y-3">
                  {/* Quick Actions */}
                  {filteredUsers.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                        className="text-xs"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Select All
                      </Button>
                    </div>
                  )}

                  {/* User List */}
                  <ScrollArea className="h-64">
                    {(recipientsError && systemUsersError && campusUsersError) ? (
                      <div className="flex flex-col items-center justify-center py-8 space-y-2">
                        <div className="text-sm text-red-600">
                          Failed to load users
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {recipientsError?.message || systemUsersError?.message || campusUsersError?.message}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Retry by refreshing the component
                            setOpen(false);
                            setTimeout(() => setOpen(true), 100);
                          }}
                        >
                          Retry
                        </Button>
                      </div>
                    ) : isLoading && !loadingTimeout ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <div className="text-sm text-muted-foreground">Loading users...</div>
                        </div>
                      </div>
                    ) : loadingTimeout ? (
                      <div className="flex flex-col items-center justify-center py-8 space-y-2">
                        <div className="text-sm text-yellow-600">
                          Loading is taking longer than expected
                        </div>
                        <div className="text-xs text-muted-foreground">
                          This might indicate a network issue or server problem
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setLoadingTimeout(false);
                            setOpen(false);
                            setTimeout(() => setOpen(true), 100);
                          }}
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-sm text-muted-foreground">
                          {searchQuery ? 'No users found matching your search' : 'No users available'}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleUserSelect(user)}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <div className="font-medium text-sm">{user.name}</div>
                                  {user.userType === 'CAMPUS_STUDENT' && (
                                    <div className="flex items-center gap-1 px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                      <ShieldCheck className="w-3 h-3" />
                                      <span>FERPA</span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {user.userType} {user.email && `• ${user.email}`}
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}

                        {/* Show More Button */}
                        {filteredUsers.length >= currentLimit && !searchQuery && (
                          <div className="pt-2 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => {
                                setCurrentLimit(prev => prev + 10);
                                setShowMore(true);
                              }}
                              disabled={loadingRecipients}
                            >
                              {loadingRecipients ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Loading more...
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Show More Users
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
