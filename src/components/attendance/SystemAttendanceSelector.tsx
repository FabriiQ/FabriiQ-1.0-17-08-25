'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/data-display/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, Clock, BarChart3 } from 'lucide-react';
import { SystemClassAttendanceSelector } from './SystemClassAttendanceSelector';
import { SystemStudentAttendanceSelector } from './SystemStudentAttendanceSelector';

export function SystemAttendanceSelector() {

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            System Attendance Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="classes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="classes" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                By Classes
              </TabsTrigger>
              <TabsTrigger value="students" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                By Students
              </TabsTrigger>
            </TabsList>

            <TabsContent value="classes" className="mt-6">
              <SystemClassAttendanceSelector />
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <SystemStudentAttendanceSelector />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
