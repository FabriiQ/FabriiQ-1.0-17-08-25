import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/server/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const challanId = params.id;

    // Get challan with related data
    const challan = await prisma.feeChallan.findUnique({
      where: { id: challanId },
      include: {
        enrollmentFee: {
          include: {
            enrollment: {
              include: {
                student: {
                  include: {
                    user: true
                  }
                },
                class: true,
              },
            },
            feeStructure: {
              include: {
                feeComponents: true
              }
            },
            discounts: {
              include: {
                discountType: true
              }
            },
            additionalCharges: true,
            arrears: true,
          },
        },
        template: true,
      },
    });

    if (!challan) {
      return NextResponse.json({ error: 'Challan not found' }, { status: 404 });
    }

    // Generate HTML for the challan
    const challanHTML = generateChallanHTML(challan);

    // Return HTML response for printing
    return new NextResponse(challanHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error generating challan print:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateChallanHTML(challan: any): string {
  const student = challan.enrollmentFee.enrollment.student;
  const enrollment = challan.enrollmentFee.enrollment;
  const feeStructure = challan.enrollmentFee.feeStructure;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fee Challan - ${challan.challanNo}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .challan-info { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .student-info, .fee-details { margin-bottom: 20px; }
        .fee-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .fee-table th, .fee-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .fee-table th { background-color: #f2f2f2; }
        .total-row { font-weight: bold; background-color: #f9f9f9; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Fee Challan</h1>
        <h2>Institution Name</h2>
      </div>

      <div class="challan-info">
        <div>
          <strong>Challan No:</strong> ${challan.challanNo}<br>
          <strong>Issue Date:</strong> ${new Date(challan.issueDate).toLocaleDateString()}<br>
          <strong>Due Date:</strong> ${new Date(challan.dueDate).toLocaleDateString()}
        </div>
        <div>
          <strong>Student ID:</strong> ${student.studentId || 'N/A'}<br>
          <strong>Student Name:</strong> ${student.user.name}<br>
          <strong>Class:</strong> ${enrollment.class.name}
        </div>
      </div>

      <div class="fee-details">
        <h3>Fee Details</h3>
        <table class="fee-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${feeStructure.feeComponents?.map((component: any) => `
              <tr>
                <td>${component.name}</td>
                <td>Rs. ${component.amount.toLocaleString()}</td>
              </tr>
            `).join('') || ''}
            
            ${challan.enrollmentFee.discounts?.map((discount: any) => `
              <tr>
                <td>Discount: ${discount.discountType.name}</td>
                <td>- Rs. ${discount.amount.toLocaleString()}</td>
              </tr>
            `).join('') || ''}
            
            ${challan.enrollmentFee.additionalCharges?.map((charge: any) => `
              <tr>
                <td>Additional: ${charge.name}</td>
                <td>Rs. ${charge.amount.toLocaleString()}</td>
              </tr>
            `).join('') || ''}
            
            <tr class="total-row">
              <td><strong>Total Amount</strong></td>
              <td><strong>Rs. ${challan.totalAmount.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p>Please pay before the due date to avoid late fees.</p>
        <p>Generated on: ${new Date().toLocaleString()}</p>
      </div>

      <script>
        // Auto-print when page loads
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;
}
