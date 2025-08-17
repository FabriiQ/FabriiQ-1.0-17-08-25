'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/data-display/card';
import { Separator } from '@/components/ui/separator';
import { api } from '@/trpc/react';
import { ChevronLeft } from '@/components/ui/icons/custom-icons';
import { FeeStructureForm, FeeStructureFormValues } from '@/components/shared/entities/fee';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/ui/loading';

export default function NewFeeStructurePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data from API
  const { data: programCampusesData, isLoading: programCampusesLoading } = api.programCampus.getAll.useQuery();
  const { data: academicCyclesData, isLoading: academicCyclesLoading } = api.academicCycle.list.useQuery({});
  const { data: termsData, isLoading: termsLoading } = api.term.list.useQuery({});

  // Process data
  const programCampuses = programCampusesData?.map(pc => ({
    id: pc.id,
    name: `${pc.campus.name} - ${pc.program.name}`
  })) || [];

  const academicCycles = academicCyclesData?.items?.map(ac => ({
    id: ac.id,
    name: ac.name
  })) || [];
  const terms = termsData?.terms?.map(term => ({
    id: term.id,
    name: term.name
  })) || [];

  // Create fee structure mutation
  const utils = api.useUtils();
  const createFeeStructureMutation = api.feeStructure.create.useMutation({
    onSuccess: async (data) => {
      // Invalidate and refetch fee structure queries
      await utils.feeStructure.getAll.invalidate();
      await utils.feeStructure.getById.invalidate({ id: data.id });

      toast({
        title: 'Fee structure created',
        description: 'The fee structure has been created successfully.',
      });
      router.push(`/admin/system/fee-management/structures/${data.id}`);
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast({
        title: 'Error creating fee structure',
        description: error.message || 'Failed to create fee structure. Please try again.',
        variant: 'destructive' as const,
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  // Handle form submission
  const handleSubmit = (values: FeeStructureFormValues) => {
    setIsSubmitting(true);
    // createdById is set on the server from the session
    createFeeStructureMutation.mutate({
      name: values.name,
      description: values.description,
      programCampusId: values.programCampusId,
      academicCycleId: values.academicCycleId,
      termId: values.termId,
      feeComponents: values.components,
      isRecurring: values.isRecurring,
      recurringInterval: values.recurringInterval,
    } as any);
  };

  // Loading state
  const isLoading = programCampusesLoading || academicCyclesLoading || termsLoading;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Fee Structure</h1>
          <p className="text-muted-foreground">
            Create a new fee structure for a program campus
          </p>
        </div>
      </div>

      <Separator />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Fee Structure Form</CardTitle>
            <CardDescription>Fill in the fee structure details below</CardDescription>
          </CardHeader>
          <CardContent>
            <FeeStructureForm
              programCampuses={programCampuses}
              academicCycles={academicCycles}
              terms={terms}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
