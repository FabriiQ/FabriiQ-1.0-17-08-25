'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Award,
  TrendingUp,
  ChevronRight,
  Calendar,
  Clock,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';

export interface StudentPointsData {
  id: string;
  name: string;
  profileImage?: string;
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  level?: number;
  lastPointsAwarded?: {
    amount: number;
    source: string;
    description: string;
    timestamp: Date;
  };
}

interface StudentPointsCardProps {
  student: StudentPointsData;
  onViewHistory?: (studentId: string) => void;
  className?: string;
}

export function StudentPointsCard({
  student,
  onViewHistory,
  className
}: StudentPointsCardProps) {
  return (
    <Card className={cn("overflow-hidden flex flex-col h-full min-h-[360px] w-full shadow-sm border", className)}>
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="h-12 w-12 border flex-shrink-0">
              <AvatarImage src={student.profileImage} alt={student.name} />
              <AvatarFallback className="text-sm font-medium">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg truncate">{student.name}</CardTitle>
              {student.level && (
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Award className="h-4 w-4 flex-shrink-0 text-amber-500" />
                  Level {student.level}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 self-start">
            <Award className="h-5 w-5 text-amber-500" />
            <span className="font-bold text-lg sm:text-xl text-amber-600">{student.totalPoints || 0}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg min-h-[70px]">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="text-center">This Week</span>
            </div>
            <div className="font-semibold text-base text-center">{student.weeklyPoints || 0} points</div>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg min-h-[70px]">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4 flex-shrink-0" />
              <span className="text-center">This Month</span>
            </div>
            <div className="font-semibold text-base text-center">{student.monthlyPoints || 0} points</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end">
          {student.lastPointsAwarded ? (
            <div className="mt-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground mb-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Last awarded:</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Badge variant="outline" className="px-2 py-1 text-xs flex-shrink-0">
                    +{student.lastPointsAwarded.amount}
                  </Badge>
                  <span className="truncate text-sm">
                    {student.lastPointsAwarded.description}
                  </span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p className="text-sm">
                        {formatDistanceToNow(student.lastPointsAwarded.timestamp, { addSuffix: true })}
                      </p>
                      <p className="text-sm">Source: {student.lastPointsAwarded.source}</p>
                    </TooltipContent>
                  </Tooltip>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground mb-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>No points awarded yet</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground text-sm">
                  Award points to this student to see their history
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pt-4 pb-4 flex-shrink-0 mt-auto px-4">
        <Button
          variant="outline"
          size="sm"
          className="text-sm h-9 w-full flex items-center justify-center gap-2 font-medium border-2"
          onClick={() => onViewHistory?.(student.id)}
        >
          <span>View History</span>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// Grid component to display multiple student cards
interface StudentPointsGridProps {
  students: StudentPointsData[];
  onViewHistory?: (studentId: string) => void;
  className?: string;
}

export function StudentPointsGrid({
  students,
  onViewHistory,
  className
}: StudentPointsGridProps) {
  return (
    <div className={cn(
      "grid gap-6 md:gap-8",
      "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4", // Better responsive breakpoints
      "auto-rows-fr", // Ensures all cards have equal height
      "place-items-center", // Center cards in their grid cells
      "py-2", // Add vertical padding
      className
    )}>
      {students.map(student => (
        <StudentPointsCard
          key={student.id}
          student={student}
          onViewHistory={onViewHistory}
          className="w-full"
        />
      ))}
    </div>
  );
}
