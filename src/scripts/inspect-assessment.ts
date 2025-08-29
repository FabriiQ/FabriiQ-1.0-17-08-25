import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inspectAssessment(id: string) {
  const a = await prisma.assessment.findUnique({
    where: { id },
    include: {
      bloomsRubric: {
        include: {
          criteria: {
            include: {
              criteriaLevels: { include: { performanceLevel: true } },
            },
          },
          performanceLevels: true,
        },
      },
    },
  });

  if (!a) {
    console.log('Assessment not found');
    return;
  }

  const info = {
    id: a.id,
    title: a.title,
    rubricId: a.rubricId,
    gradingType: a.gradingType,
    hasBloomsRubric: !!a.bloomsRubric,
    criteriaCount: (a as any).bloomsRubric?.criteria?.length || 0,
    perfLevelsCount: (a as any).bloomsRubric?.performanceLevels?.length || 0,
    rubricTitle: (a as any).bloomsRubric?.title,
    hasLegacyRubricJson: !!a.rubric,
  };
  console.log('Assessment:', info);
  if (a.rubric) {
    try {
      const json = a.rubric as any;
      const crit = Array.isArray(json?.criteria) ? json.criteria.length : 0;
      console.log('Legacy rubric JSON present. criteria length:', crit);
    } catch {}
  }

  if (a.bloomsRubric) {
    console.log('Criteria sample:', (a as any).bloomsRubric.criteria.map((c: any) => ({ id: c.id, name: c.name, criteriaLevels: c.criteriaLevels.length })).slice(0, 5));
    console.log('Performance levels:', (a as any).bloomsRubric.performanceLevels.map((pl: any) => ({ id: pl.id, name: pl.name, score: pl.score })));
  }
}

(async () => {
  const id = process.argv[2];
  if (!id) {
    console.error('Usage: npx tsx src/scripts/inspect-assessment.ts <assessmentId>');
    process.exit(1);
  }
  try {
    await inspectAssessment(id);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();

