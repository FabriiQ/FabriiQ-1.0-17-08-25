'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { QuestionType, DifficultyLevel } from '../../models/types';
import { BloomsTaxonomyLevel, SystemStatus } from '@prisma/client';
import { api } from '@/trpc/react';
import { X } from 'lucide-react';
import { useRenderTracker, usePropChangeTracker } from '../../hooks/useRenderTracker';

interface QuestionFilterProps {
  filters: {
    questionType?: QuestionType;
    difficulty?: DifficultyLevel;
    subjectId?: string;
    courseId?: string;
    topicId?: string;
    gradeLevel?: number;
    year?: number;
    status?: SystemStatus;
    bloomsLevel?: BloomsTaxonomyLevel;
  };
  onChange: (filters: QuestionFilterProps['filters']) => void;
  className?: string;
}

/**
 * Question Filter Component
 *
 * This component provides filtering options for questions in the question bank.
 */
export const QuestionFilter: React.FC<QuestionFilterProps> = React.memo(({
  filters,
  onChange,
  className = '',
}) => {
  // Debug: Track renders and prop changes
  useRenderTracker('QuestionFilter', { filters, className });
  usePropChangeTracker('QuestionFilter', { filters, onChange, className });
  // Fetch subjects
  const { data: subjects } = api.subject.list.useQuery(
    { status: SystemStatus.ACTIVE },
    { enabled: true }
  );

  // Fetch courses based on selected subject
  const { data: courses } = api.course.list.useQuery(
    {
      status: SystemStatus.ACTIVE
    },
    { enabled: !!filters.subjectId }
  );

  // Fetch topics based on selected subject and course
  const { data: topics } = api.subjectTopic.list.useQuery(
    {
      subjectId: filters.subjectId,
      status: SystemStatus.ACTIVE
    },
    { enabled: !!filters.subjectId }
  );

  // Handle filter changes
  const handleFilterChange = useCallback((key: keyof QuestionFilterProps['filters'], value: any) => {
    // If changing subject, reset course and topic
    if (key === 'subjectId') {
      onChange({
        ...filters,
        subjectId: value,
        courseId: undefined,
        topicId: undefined,
      });
      return;
    }

    // If changing course, reset topic
    if (key === 'courseId') {
      onChange({
        ...filters,
        courseId: value,
        topicId: undefined,
      });
      return;
    }

    // Otherwise, just update the specified filter
    onChange({
      ...filters,
      [key]: value,
    });
  }, [filters, onChange]);

  // Handle clearing all filters
  const handleClearFilters = useCallback(() => {
    onChange({
      status: SystemStatus.ACTIVE,
    });
  }, [onChange]);

  // Memoized handlers for each filter type to prevent unnecessary re-renders
  const handleQuestionTypeChange = useCallback((value: string) => {
    handleFilterChange('questionType', value === '__ALL__' ? undefined : value);
  }, [handleFilterChange]);

  const handleDifficultyChange = useCallback((value: string) => {
    handleFilterChange('difficulty', value === '__ALL__' ? undefined : value);
  }, [handleFilterChange]);

  const handleSubjectChange = useCallback((value: string) => {
    handleFilterChange('subjectId', value === '__ALL__' ? undefined : value);
  }, [handleFilterChange]);

  const handleCourseChange = useCallback((value: string) => {
    handleFilterChange('courseId', value === '__ALL__' ? undefined : value);
  }, [handleFilterChange]);

  const handleTopicChange = useCallback((value: string) => {
    handleFilterChange('topicId', value === '__ALL__' ? undefined : value);
  }, [handleFilterChange]);

  const handleGradeLevelChange = useCallback((value: string) => {
    handleFilterChange('gradeLevel', value === '__ALL__' ? undefined : parseInt(value));
  }, [handleFilterChange]);

  const handleYearChange = useCallback((value: string) => {
    handleFilterChange('year', value === '__ALL__' ? undefined : parseInt(value));
  }, [handleFilterChange]);

  const handleStatusChange = useCallback((value: string) => {
    handleFilterChange('status', value);
  }, [handleFilterChange]);

  // Memoized options to prevent unnecessary re-renders
  const questionTypeOptions = useMemo(() =>
    Object.values(QuestionType).map((type) => ({
      value: type,
      label: type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    })), []
  );

  const difficultyOptions = useMemo(() =>
    Object.values(DifficultyLevel).map((level) => ({
      value: level,
      label: level.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    })), []
  );

  const gradeOptions = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      value: (i + 1).toString(),
      label: `Grade ${i + 1}`
    })), []
  );

  const yearOptions = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => {
      const year = new Date().getFullYear() - i;
      return {
        value: year.toString(),
        label: year.toString()
      };
    }), []
  );

  const statusOptions = useMemo(() =>
    Object.values(SystemStatus).map((status) => ({
      value: status,
      label: status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    })), []
  );

  // Check if any filters are applied
  const hasFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'status' && value === SystemStatus.ACTIVE) return false;
    return value !== undefined;
  });

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 px-2 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Question Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="questionType">Question Type</Label>
          <Select
            value={filters.questionType || '__ALL__'}
            onValueChange={handleQuestionTypeChange}
          >
            <SelectTrigger id="questionType">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Types</SelectItem>
              {questionTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={filters.difficulty || '__ALL__'}
            onValueChange={handleDifficultyChange}
          >
            <SelectTrigger id="difficulty">
              <SelectValue placeholder="All Difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Difficulties</SelectItem>
              {difficultyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject Filter */}
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select
            value={filters.subjectId || '__ALL__'}
            onValueChange={handleSubjectChange}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Subjects</SelectItem>
              {Array.isArray(subjects) ? subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              )) : null}
            </SelectContent>
          </Select>
        </div>

        {/* Course Filter */}
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Select
            value={filters.courseId || '__ALL__'}
            onValueChange={handleCourseChange}
            disabled={!filters.subjectId}
          >
            <SelectTrigger id="course">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Courses</SelectItem>
              {Array.isArray(courses) ? courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              )) : null}
            </SelectContent>
          </Select>
        </div>

        {/* Topic Filter */}
        <div className="space-y-2">
          <Label htmlFor="topic">Topic</Label>
          <Select
            value={filters.topicId || '__ALL__'}
            onValueChange={handleTopicChange}
            disabled={!filters.subjectId}
          >
            <SelectTrigger id="topic">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Topics</SelectItem>
              {topics?.data && Array.isArray(topics.data) ? topics.data.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.title || topic.code || topic.id}
                </SelectItem>
              )) : null}
            </SelectContent>
          </Select>
        </div>

        {/* Grade Level Filter */}
        <div className="space-y-2">
          <Label htmlFor="gradeLevel">Grade Level</Label>
          <Select
            value={filters.gradeLevel?.toString() || '__ALL__'}
            onValueChange={handleGradeLevelChange}
          >
            <SelectTrigger id="gradeLevel">
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Grades</SelectItem>
              {gradeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            value={filters.year?.toString() || '__ALL__'}
            onValueChange={handleYearChange}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Years</SelectItem>
              {yearOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status || SystemStatus.ACTIVE}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
});

QuestionFilter.displayName = 'QuestionFilter';

export default QuestionFilter;
