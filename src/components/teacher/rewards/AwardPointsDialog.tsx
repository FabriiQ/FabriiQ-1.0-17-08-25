'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/trpc/react';
import { Award, BookOpen, Check, User, Search, ChevronLeft, ChevronRight, Users } from 'lucide-react';

// Define point categories with preset values
const POINT_CATEGORIES = [
  { id: 'participation', label: 'Class Participation', icon: <User className="h-4 w-4" />, defaultPoints: 10, maxPoints: 25 },
  { id: 'behavior', label: 'Positive Behavior', icon: <Check className="h-4 w-4" />, defaultPoints: 15, maxPoints: 30 },
  { id: 'academic', label: 'Academic Achievement', icon: <BookOpen className="h-4 w-4" />, defaultPoints: 20, maxPoints: 50 },
  { id: 'improvement', label: 'Improvement', icon: <Award className="h-4 w-4" />, defaultPoints: 15, maxPoints: 40 },
  { id: 'special', label: 'Special Recognition', icon: <Award className="h-4 w-4" />, defaultPoints: 25, maxPoints: 100 },
  { id: 'custom', label: 'Custom Award', icon: <Award className="h-4 w-4" />, defaultPoints: 10, maxPoints: 100 }
];

export interface Student {
  id: string;
  name: string;
  profileImage?: string;
}

interface AwardPointsDialogProps {
  students: Student[];
  classId: string;
  onPointsAwarded?: () => void;
  trigger?: React.ReactNode;
}

export function AwardPointsDialog({
  students,
  classId,
  onPointsAwarded,
  trigger
}: AwardPointsDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(POINT_CATEGORIES[0].id);
  const [points, setPoints] = useState(POINT_CATEGORIES[0].defaultPoints);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 25; // Increased for better UX

  const { toast } = useToast();

  // Get the award points mutation using the existing points service
  const awardPointsMutation = api.points.awardPoints.useMutation({
    onSuccess: (data) => {
      console.log("Points awarded successfully:", data);
      toast({
        title: 'Points awarded successfully',
        description: `${points} points awarded to ${selectedStudents.length} student(s)`,
        variant: 'success',
      });

      // Reset form and close dialog
      resetForm();
      setOpen(false);

      // Call the callback if provided
      if (onPointsAwarded) {
        onPointsAwarded();
      }
    },
    onError: (error) => {
      console.error("Error awarding points:", error);
      toast({
        title: 'Error awarding points',
        description: error.message,
      });
      setIsSubmitting(false);
    }
  });

  // Get the current category
  const currentCategory = POINT_CATEGORIES.find(cat => cat.id === selectedCategory) || POINT_CATEGORIES[0];

  // Filter and paginate students
  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students;

    const searchLower = searchTerm.toLowerCase().trim();
    return students.filter(student => {
      const nameLower = student.name.toLowerCase();
      // Support partial matching and multiple words
      return nameLower.includes(searchLower) ||
             searchLower.split(' ').every(term => nameLower.includes(term));
    });
  }, [students, searchTerm]);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;
    return filteredStudents.slice(startIndex, startIndex + studentsPerPage);
  }, [filteredStudents, currentPage, studentsPerPage]);

  // Reset the form
  const resetForm = () => {
    setSelectedStudents([]);
    setSelectedCategory(POINT_CATEGORIES[0].id);
    setPoints(POINT_CATEGORIES[0].defaultPoints);
    setReason('');
    setIsSubmitting(false);
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    const category = POINT_CATEGORIES.find(cat => cat.id === value);
    if (category) {
      setSelectedCategory(value);
      setPoints(category.defaultPoints);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedStudents.length === 0) {
      toast({
        title: 'No students selected',
        description: 'Please select at least one student to award points to',
      });
      return;
    }

    if (points <= 0) {
      toast({
        title: 'Invalid points',
        description: 'Please enter a positive number of points',
      });
      return;
    }

    if (!reason.trim()) {
      toast({
        title: 'No reason provided',
        description: 'Please provide a reason for awarding points',
      });
      return;
    }

    setIsSubmitting(true);

    // Award points to each selected student
    try {
      // Create a descriptive reason with category
      const category = POINT_CATEGORIES.find(cat => cat.id === selectedCategory);
      const fullDescription = `${category?.label || 'Bonus'}: ${reason}`;

      // Process each student
      for (const studentId of selectedStudents) {
        await awardPointsMutation.mutateAsync({
          studentId,
          amount: points,
          source: 'teacher-bonus', // Use the source expected by your API
          sourceId: undefined, // Optional in your API
          classId, // Pass the class ID
          description: fullDescription,
        });
      }
    } catch (error) {
      // Error is handled by the mutation
      console.error('Error awarding points:', error);
    }
  };

  // Toggle student selection
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Select all students (filtered)
  const selectAllStudents = () => {
    setSelectedStudents(filteredStudents.map(student => student.id));
  };

  // Select all students on current page
  const selectAllOnPage = () => {
    const pageStudentIds = paginatedStudents.map(student => student.id);
    setSelectedStudents(prev => [...new Set([...prev, ...pageStudentIds])]);
  };

  // Deselect all students
  const deselectAllStudents = () => {
    setSelectedStudents([]);
  };

  // Handle page navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Award className="h-4 w-4" />
            Award Points
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Award Points to Students</DialogTitle>
          <DialogDescription>
            Recognize student achievements by awarding points. ({students.length} students total)
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 overflow-y-auto pr-1 flex-grow">
          {/* Student Selection */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <Label htmlFor="students">Select Students</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllStudents}
                  className="h-7 text-xs flex-1 sm:flex-none"
                >
                  Select All ({filteredStudents.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllOnPage}
                  className="h-7 text-xs flex-1 sm:flex-none"
                >
                  Select Page
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deselectAllStudents}
                  className="h-7 text-xs flex-1 sm:flex-none"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${students.length} students...`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="pl-10"
              />
              {searchTerm && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                  {filteredStudents.length} found
                </div>
              )}
            </div>

            {/* Student List */}
            <div className="max-h-[250px] overflow-y-auto border rounded-md p-3 touch-auto">
              {paginatedStudents.length > 0 ? (
                <div className="space-y-2">
                  {paginatedStudents.map(student => (
                    <div
                      key={student.id}
                      className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                      <input
                        type="checkbox"
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor={`student-${student.id}`}
                        className="text-sm flex-grow cursor-pointer py-1 font-medium"
                      >
                        {student.name}
                      </label>
                      {selectedStudents.includes(student.id) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {searchTerm ? `No students found matching "${searchTerm}"` : 'No students available'}
                  </p>
                  {searchTerm && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Try a different search term
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-md">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-muted-foreground font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-muted-foreground text-xs">
                  Showing {paginatedStudents.length} of {filteredStudents.length}
                  {searchTerm && ` (filtered from ${students.length})`}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground font-medium">
                {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
              </p>
              {selectedStudents.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={deselectAllStudents}
                  className="h-6 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear selection
                </Button>
              )}
            </div>
          </div>

          {/* Point Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Point Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {POINT_CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Points Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="points">Points Amount</Label>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-amber-600">{points}</span>
              </div>
            </div>

            <Slider
              id="points"
              min={1}
              max={currentCategory.maxPoints}
              step={1}
              value={[points]}
              onValueChange={(value) => setPoints(value[0])}
              className="py-2"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>{currentCategory.maxPoints}</span>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Why are you awarding these points?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 flex-shrink-0 mt-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedStudents.length === 0 || !reason.trim()}
            className="gap-2 w-full sm:w-auto"
          >
            <Award className="h-4 w-4" />
            {isSubmitting ? 'Awarding...' : 'Award Points'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
