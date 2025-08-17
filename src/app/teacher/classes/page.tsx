'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/trpc/react';
import { ClassesGrid } from "@/components/teacher/classes/ClassesGrid";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function TeacherClassesPage() {
  const { data: session, status } = useSession();

  // Debug logging
  console.log('Classes - Session status:', status);
  console.log('Classes - Session data:', session);
  console.log('Classes - User ID:', session?.user?.id);

  // Fetch teacher classes with proper cleanup
  const { data: classes, isLoading, error } = api.class.getMyClasses.useQuery(
    undefined,
    {
      enabled: !!session?.user?.id,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 30000, // Refresh every 30 seconds
      refetchIntervalInBackground: false, // Stop refetching when tab is not active
    }
  );

  // Debug logging for query
  console.log('Classes - Query loading:', isLoading);
  console.log('Classes - Query error:', error);
  console.log('Classes - Query data:', classes);

  // Test query to check if session is working
  const { data: sessionTest } = api.auth.getSession.useQuery(undefined, {
    enabled: true,
  });
  console.log('Classes - Session test:', sessionTest);

  // Show simple loading state with spinner
  if (status === 'loading' || isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your classes...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error.message || 'Failed to load classes. Please try again.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <ClassesGrid classes={classes || []} />
    </div>
  );
}