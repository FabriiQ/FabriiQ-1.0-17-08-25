const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedStudentPoints() {
  try {
    console.log('🎯 Starting student points seeding...');
    
    // Find Year 8 C class (or similar)
    const targetClass = await prisma.class.findFirst({
      where: {
        OR: [
          { code: { contains: 'Y8-C' } },
          { code: { contains: '8-C' } },
          { name: { contains: 'Year 8 C' } },
          { name: { contains: '8 C' } }
        ]
      }
    });

    if (!targetClass) {
      console.log('❌ Year 8 C class not found. Looking for any class...');
      const anyClass = await prisma.class.findFirst({
        where: { status: 'ACTIVE' }
      });
      
      if (!anyClass) {
        console.log('❌ No active classes found. Please run the main seeding first.');
        return;
      }
      
      console.log(`📚 Using class: ${anyClass.name} (${anyClass.code})`);
      await seedPointsForClass(anyClass);
    } else {
      console.log(`📚 Found target class: ${targetClass.name} (${targetClass.code})`);
      await seedPointsForClass(targetClass);
    }

    console.log('✅ Student points seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding student points:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedPointsForClass(classData) {
  // Get students in this class
  const enrollments = await prisma.studentEnrollment.findMany({
    where: {
      classId: classData.id,
      status: 'ACTIVE'
    },
    include: {
      student: {
        include: {
          user: true
        }
      }
    }
  });

  if (enrollments.length === 0) {
    console.log('❌ No students found in this class.');
    return;
  }

  console.log(`👥 Found ${enrollments.length} students in class`);

  // Create various types of points for each student
  const pointsSources = [
    { source: 'teacher-bonus', description: 'Improvement: test', amount: 40 },
    { source: 'participation', description: 'Active participation in class', amount: 15 },
    { source: 'behavior', description: 'Excellent behavior', amount: 20 },
    { source: 'improvement', description: 'Significant improvement', amount: 25 },
    { source: 'bonus', description: 'Extra credit work', amount: 30 }
  ];

  for (const enrollment of enrollments) {
    const student = enrollment.student;
    console.log(`   📝 Creating points for: ${student.user.name}`);

    // Create points from different time periods
    const now = new Date();
    const thisWeek = new Date(now.getTime() - (Math.random() * 7 * 24 * 60 * 60 * 1000)); // Random time this week
    const thisMonth = new Date(now.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000)); // Random time this month
    const older = new Date(now.getTime() - (Math.random() * 60 * 24 * 60 * 60 * 1000)); // Random time older

    // Create recent points (this week)
    for (let i = 0; i < 2; i++) {
      const pointData = pointsSources[Math.floor(Math.random() * pointsSources.length)];
      await prisma.studentPoints.create({
        data: {
          studentId: student.id,
          classId: classData.id,
          amount: pointData.amount,
          source: pointData.source,
          description: pointData.description,
          createdAt: thisWeek,
          status: 'ACTIVE'
        }
      });
    }

    // Create monthly points
    for (let i = 0; i < 3; i++) {
      const pointData = pointsSources[Math.floor(Math.random() * pointsSources.length)];
      await prisma.studentPoints.create({
        data: {
          studentId: student.id,
          classId: classData.id,
          amount: pointData.amount,
          source: pointData.source,
          description: pointData.description,
          createdAt: thisMonth,
          status: 'ACTIVE'
        }
      });
    }

    // Create older points
    for (let i = 0; i < 2; i++) {
      const pointData = pointsSources[Math.floor(Math.random() * pointsSources.length)];
      await prisma.studentPoints.create({
        data: {
          studentId: student.id,
          classId: classData.id,
          amount: pointData.amount,
          source: pointData.source,
          description: pointData.description,
          createdAt: older,
          status: 'ACTIVE'
        }
      });
    }

    console.log(`   ✅ Created points for ${student.user.name}`);
  }
}

// Run the seeding
seedStudentPoints();
