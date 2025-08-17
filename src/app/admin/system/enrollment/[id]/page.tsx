'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/data-display/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronLeft,
  Edit,
  ArrowRight,
  Calendar,
  User,
  GraduationCap,
  BookOpen,
  Clock,
  FileText,
  Mail,
  MapPin,
  Trash
} from 'lucide-react';
import {
  Building2,
  Phone as PhoneIcon,
  DollarSign as Dollar
} from '@/components/ui/icons/lucide-icons';
import { api } from '@/trpc/react';
import { useToast } from '@/components/ui/use-toast';
import { StudentTransferDialog } from '@/components/shared/entities/students/StudentTransferDialog';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

// Define EnrollmentStatus enum locally since it's not properly exported from Prisma client
enum EnrollmentStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  WITHDRAWN = "WITHDRAWN",
  INACTIVE = "INACTIVE"
}

export default function EnrollmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const enrollmentId = params?.id as string;

  // Fetch enrollment details
  const { data: enrollmentData, isLoading, error } = api.enrollment.getEnrollment.useQuery(
    { id: enrollmentId },
    { enabled: !!enrollmentId }
  );

  const enrollment = enrollmentData?.enrollment;

  // Fetch data for transfer dialog
  const { data: currentClasses } = api.enrollment.getEnrollmentsByStudent.useQuery(
    { studentId: enrollment?.student?.id || '' },
    { enabled: !!enrollment?.student?.id }
  );

  const { data: availableClasses } = api.class.getAllClasses.useQuery(
    undefined,
    { enabled: !!enrollment?.class }
  );

  const { data: availableCampuses } = api.campus.getAllCampuses.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !enrollment) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Enrollment Not Found</h1>
            <p className="text-muted-foreground">The requested enrollment could not be found</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              The enrollment you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Button asChild className="mt-4">
              <Link href="/admin/system/enrollment">Back to Enrollments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      case 'WITHDRAWN': return 'bg-red-100 text-red-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock payment details since enrollmentPayment model doesn't exist yet
  const payment = {
    id: 'mock-payment-id',
    enrollmentId,
    amount: 1200.00,
    dueDate: new Date(),
    paymentStatus: 'PENDING',
    paymentMethod: 'Credit Card',
    notes: 'Payment pending verification',
    transactions: [
      {
        id: 'mock-transaction-1',
        date: new Date(),
        amount: 500.00,
        method: 'Credit Card',
        reference: 'TXN-001',
        notes: 'Partial payment'
      }
    ]
  };

  // Mock enrollment history
  const history = [
    {
      id: 'mock-history-1',
      enrollmentId,
      action: 'Enrollment Created',
      notes: 'Initial enrollment',
      createdAt: new Date(),
      createdBy: {
        name: 'System Admin',
      }
    }
  ];

  // Mock enrollment documents
  const documents = [
    {
      id: 'mock-doc-1',
      enrollmentId,
      name: 'Enrollment Form',
      type: 'Application',
      url: '#',
      fileSize: 1024,
      createdAt: new Date(),
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/system/enrollment">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Enrollment Details</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/system/enrollment/${enrollmentId}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" /> Cancel Enrollment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Enrollment Information</CardTitle>
                  <CardDescription>Details about this enrollment</CardDescription>
                </div>
                <Badge
                  variant={
                    enrollment.status === "ACTIVE" ? "success" :
                    enrollment.status === "PENDING" ? "warning" :
                    enrollment.status === "COMPLETED" ? "default" :
                    "destructive"
                  }
                >
                  {enrollment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Class</h3>
                  <p className="text-lg font-medium">{enrollment.class?.name}</p>
                  <p className="text-sm text-muted-foreground">{enrollment.class?.programCampus?.program?.name || 'No program'}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Enrollment Period</h3>
                  <p className="text-lg font-medium">{format(new Date(enrollment.startDate), "MMMM d, yyyy")}</p>
                  {enrollment.endDate && (
                    <p className="text-sm text-muted-foreground">
                      to {format(new Date(enrollment.endDate), "MMMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Campus & Program</h3>
                <div className="flex items-start space-x-3 p-3 rounded-md bg-muted">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Campus Information</p>
                    <p className="text-sm text-muted-foreground">
                      {enrollment.class?.programCampus?.program?.name}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Notes</h3>
                <p className="text-sm">
                  No notes available for this enrollment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="payment" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="fee">Fee</TabsTrigger>
            </TabsList>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Payment Information</CardTitle>
                      <CardDescription>Payment details for this enrollment</CardDescription>
                    </div>
                    <Badge
                      variant={
                        payment?.paymentStatus === "PAID" ? "success" :
                        payment?.paymentStatus === "PARTIAL" ? "secondary" :
                        payment?.paymentStatus === "WAIVED" ? "outline" :
                        "warning"
                      }
                    >
                      {payment?.paymentStatus || "PENDING"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {payment ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                          <p className="text-lg font-medium">${payment.amount.toFixed(2)}</p>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                          <p className="text-lg font-medium">
                            {payment.dueDate ? format(new Date(payment.dueDate), "MMMM d, yyyy") : "Not specified"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                          <p className="text-lg font-medium">{payment.paymentMethod || "Not specified"}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">Payment History</h3>
                        {payment.transactions && payment.transactions.length > 0 ? (
                          <div className="space-y-3">
                            {payment.transactions.map((transaction, index) => (
                              <div key={index} className="flex items-start justify-between p-3 rounded-md bg-muted">
                                <div className="flex items-start space-x-3">
                                  <Calendar className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="font-medium">{format(new Date(transaction.date), "MMMM d, yyyy")}</p>
                                    <p className="text-sm text-muted-foreground">{transaction.method}</p>
                                  </div>
                                </div>
                                <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No payment transactions recorded</p>
                        )}
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">Notes</h3>
                        <p className="text-sm">
                          {payment.notes || "No payment notes available."}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No payment information available</p>
                      <Button className="mt-4" asChild>
                        <Link href={`/admin/system/enrollment/${enrollmentId}/payment/new`}>
                          Add Payment Information
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
                {payment && (
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/admin/system/enrollment/${enrollmentId}/payment/edit`}>
                        Update Payment Information
                      </Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment History</CardTitle>
                  <CardDescription>History of changes to this enrollment</CardDescription>
                </CardHeader>
                <CardContent>
                  {history && history.length > 0 ? (
                    <div className="space-y-4">
                      {history.map((entry) => (
                        <div key={entry.id} className="border-l-2 border-primary pl-4 pb-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{entry.action}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(entry.createdAt), "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            by {entry.createdBy.name}
                          </p>
                          {entry.notes && (
                            <p className="text-sm mt-2">{entry.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No history records available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Documents</CardTitle>
                      <CardDescription>Documents related to this enrollment</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href={`/admin/system/enrollment/${enrollmentId}/documents/upload`}>
                        Upload Document
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {documents && documents.length > 0 ? (
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 rounded-md border">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Uploaded on {format(new Date(doc.createdAt), "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={doc.url} target="_blank">View</Link>
                            </Button>
                            <Button variant="ghost" size="sm">Download</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No documents available</p>
                      <Button className="mt-4" asChild>
                        <Link href={`/admin/system/enrollment/${enrollmentId}/documents/upload`}>
                          Upload Document
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fee">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Fee Management</CardTitle>
                      <CardDescription>Manage enrollment fees, discounts, and payments</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href={`/admin/system/enrollment/${enrollmentId}/fee`}>
                        Manage Fees
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Fee Structure</p>
                          <p className="text-xs text-muted-foreground">
                            Assign and manage fee structure for this enrollment
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Discounts & Scholarships</p>
                          <p className="text-xs text-muted-foreground">
                            Apply discounts and scholarships to this enrollment
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Fee Challans</p>
                          <p className="text-xs text-muted-foreground">
                            Generate and print fee challans
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Details about the enrolled student</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback>{enrollment.student?.user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{enrollment.student?.user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{enrollment.student?.user?.email}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                    <p>{enrollment.student?.enrollmentNumber || "Not assigned"}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>Not provided</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{enrollment.student?.user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p>Not provided</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                    <p>Not provided</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Emergency Contact</h3>
                <p className="text-sm text-muted-foreground">No emergency contact information provided</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/admin/system/students/${enrollment.student?.id}`}>
                  View Student Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Enrollments</CardTitle>
              <CardDescription>Other classes this student is enrolled in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* This would be populated with actual data in a real implementation */}
                <div className="p-3 rounded-md border">
                  <p className="font-medium">Introduction to Programming</p>
                  <p className="text-sm text-muted-foreground">Computer Science</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline">Active</Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#">View</Link>
                    </Button>
                  </div>
                </div>
                <div className="p-3 rounded-md border">
                  <p className="font-medium">Data Structures</p>
                  <p className="text-sm text-muted-foreground">Computer Science</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline">Completed</Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#">View</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/admin/system/students/${enrollment.student?.id}/enrollments`}>
                  View All Enrollments
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
