'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Save,
  Eye,
  CheckCircle2,
  AlertCircle,
  User,
  FileText,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react';
import { SubmissionStatus } from '@/server/api/constants';
import { toast } from 'sonner';
import { SubmissionViewDialog } from '../submission/SubmissionViewDialog';

interface BulkGradingSubmission {
  id: string;
  status: any; // Accept any status type to handle enum differences
  submittedAt: Date | null;
  score: number | null;
  feedback?: any;
  content?: any;
  attachments?: any;
  student?: {
    id: string;
    user: {
      name: string | null;
      email?: string;
    };
  };
}

interface BulkGradingInterfaceProps {
  assessmentId: string;
  submissions: BulkGradingSubmission[];
  assessment: {
    id: string;
    title: string;
    maxScore?: number | null;
  };
  onGradingComplete?: () => void;
  className?: string;
}

interface GradeInput {
  submissionId: string;
  score: number;
  feedback: string;
  selected: boolean;
}

export function BulkGradingInterface({
  assessmentId,
  submissions,
  assessment,
  onGradingComplete,
  className,
}: BulkGradingInterfaceProps) {
  const [grades, setGrades] = useState<Record<string, GradeInput>>(() => {
    const initialGrades: Record<string, GradeInput> = {};
    submissions.forEach(submission => {
      initialGrades[submission.id] = {
        submissionId: submission.id,
        score: submission.score || 0,
        feedback: typeof submission.feedback === 'string' ? submission.feedback : '',
        selected: false,
      };
    });
    return initialGrades;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const maxScore = assessment.maxScore || 100;

  const bulkGradeMutation = api.assessment.bulkGradeSubmissions.useMutation({
    onSuccess: () => {
      toast.success('Submissions graded successfully');
      onGradingComplete?.();
    },
    onError: (error) => {
      toast.error(`Failed to grade submissions: ${error.message}`);
    },
  });

  const updateGrade = (submissionId: string, field: keyof Omit<GradeInput, 'submissionId'>, value: any) => {
    setGrades(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: value,
      }
    }));
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setGrades(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(id => {
        updated[id].selected = newSelectAll;
      });
      return updated;
    });
  };

  const handleBulkGrade = async () => {
    const selectedGrades = Object.values(grades).filter(grade => grade.selected);
    
    if (selectedGrades.length === 0) {
      toast.error('Please select at least one submission to grade');
      return;
    }

    setIsSubmitting(true);
    try {
      await bulkGradeMutation.mutateAsync({
        assessmentId,
        grades: selectedGrades.map(grade => ({
          submissionId: grade.submissionId,
          score: grade.score,
          feedback: grade.feedback,
          status: SubmissionStatus.GRADED,
        })),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCount = Object.values(grades).filter(g => g.selected).length;

  const getStatusColor = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.GRADED:
        return 'bg-green-100 text-green-800';
      case SubmissionStatus.SUBMITTED:
        return 'bg-blue-100 text-blue-800';
      case SubmissionStatus.DRAFT:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Bulk Grading: {assessment.title}
            </CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {selectedCount} of {submissions.length} selected
              </span>
              <Button
                onClick={handleBulkGrade}
                disabled={isSubmitting || selectedCount === 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Grade Selected ({selectedCount})
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 w-12">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4">Student</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Submitted</th>
                  <th className="text-left py-3 px-4 w-32">Score</th>
                  <th className="text-left py-3 px-4">Feedback</th>
                  <th className="text-right py-3 px-4 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => {
                  const grade = grades[submission.id];
                  const studentName = submission.student?.user?.name || submission.student?.user?.email || 'Unknown Student';
                  
                  return (
                    <tr key={submission.id} className="border-b hover:bg-muted/25">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={grade.selected}
                          onCheckedChange={(checked) => 
                            updateGrade(submission.id, 'selected', checked)
                          }
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              {submission.student?.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {submission.submittedAt 
                          ? new Date(submission.submittedAt).toLocaleDateString()
                          : 'Not submitted'
                        }
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max={maxScore}
                            value={grade.score}
                            onChange={(e) => 
                              updateGrade(submission.id, 'score', Number(e.target.value))
                            }
                            className="w-16 h-8"
                          />
                          <span className="text-xs text-muted-foreground">
                            /{maxScore}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Textarea
                          placeholder="Feedback..."
                          value={grade.feedback}
                          onChange={(e) => 
                            updateGrade(submission.id, 'feedback', e.target.value)
                          }
                          className="min-h-[60px] text-sm"
                          rows={2}
                        />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <SubmissionViewDialog
                            submission={submission}
                            assessment={assessment}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Open upload dialog for this submission
                              // This would need to be implemented with a state management approach
                              console.log('Upload files for submission:', submission.id);
                            }}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Upload
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Grading Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold">{submissions.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Already Graded</p>
              <p className="text-2xl font-bold">
                {submissions.filter(s => s.status === SubmissionStatus.GRADED).length}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Selected for Grading</p>
              <p className="text-2xl font-bold">{selectedCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold">
                {submissions.filter(s => s.status !== SubmissionStatus.GRADED).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
