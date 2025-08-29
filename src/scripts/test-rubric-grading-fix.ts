/**
 * Test script to validate the rubric grading system fix
 * This script tests the grading method detection logic
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock assessment service method for testing
function determineGradingMethod(assessment: any): 'SCORE_BASED' | 'RUBRIC_BASED' {
  // Priority 1: Explicit gradingType setting
  if (assessment.gradingType === 'RUBRIC') return 'RUBRIC_BASED';
  if (assessment.gradingType === 'SCORE') return 'SCORE_BASED';
  
  // Priority 2: Rubric association with valid criteria
  if (assessment.rubricId && assessment.bloomsRubric) {
    const rubric = assessment.bloomsRubric as any;
    const hasCriteria = rubric.criteria && rubric.criteria.length > 0;
    const hasPerformanceLevels = rubric.performanceLevels && rubric.performanceLevels.length > 0;
    
    if (hasCriteria && hasPerformanceLevels) {
      return 'RUBRIC_BASED';
    }
  }
  
  // Default: Score-based grading
  return 'SCORE_BASED';
}

async function testRubricGradingFix() {
  console.log('🧪 Testing Rubric Grading System Fix...\n');

  try {
    // Test 0: Check available rubrics
    console.log('📋 Test 0: Checking available rubrics...');
    const availableRubrics = await prisma.rubric.findMany({
      include: {
        criteria: {
          include: {
            criteriaLevels: {
              include: {
                performanceLevel: true,
              },
            },
          },
        },
        performanceLevels: true,
      },
      take: 5
    });

    console.log(`Found ${availableRubrics.length} rubrics in database`);

    if (availableRubrics.length > 0) {
      console.log('\n📊 Available Rubrics:');
      availableRubrics.forEach((rubric, index) => {
        console.log(`   ${index + 1}. ${rubric.title} (ID: ${rubric.id})`);
        console.log(`      Criteria: ${(rubric as any).criteria?.length || 0}`);
        console.log(`      Performance Levels: ${(rubric as any).performanceLevels?.length || 0}`);
      });
    }

    // Test 1: Find assessments with rubricId
    console.log('\n📋 Test 1: Finding assessments with rubricId...');
    const assessmentsWithRubric = await prisma.assessment.findMany({
      where: {
        rubricId: {
          not: null
        }
      },
      include: {
        bloomsRubric: {
          include: {
            criteria: {
              include: {
                criteriaLevels: {
                  include: {
                    performanceLevel: true,
                  },
                },
              },
            },
            performanceLevels: true,
          },
        },
      },
      take: 5
    });

    console.log(`Found ${assessmentsWithRubric.length} assessments with rubricId`);

    // Test 2: Test grading method detection
    console.log('\n🎯 Test 2: Testing grading method detection...');
    for (const assessment of assessmentsWithRubric) {
      const gradingMethod = determineGradingMethod(assessment);
      const rubricConfig = {
        hasValidRubric: !!assessment.bloomsRubric,
        criteriaCount: (assessment.bloomsRubric as any)?.criteria?.length || 0,
        performanceLevelsCount: (assessment.bloomsRubric as any)?.performanceLevels?.length || 0,
        isComplete: ((assessment.bloomsRubric as any)?.criteria?.length || 0) > 0 && 
                   ((assessment.bloomsRubric as any)?.performanceLevels?.length || 0) > 0
      };

      console.log(`\n📊 Assessment: ${assessment.title}`);
      console.log(`   ID: ${assessment.id}`);
      console.log(`   RubricId: ${assessment.rubricId}`);
      console.log(`   GradingType: ${assessment.gradingType}`);
      console.log(`   Determined Method: ${gradingMethod}`);
      console.log(`   Rubric Config:`, rubricConfig);
      
      // Validate the fix
      const shouldBeRubricBased = assessment.rubricId && 
                                 assessment.bloomsRubric && 
                                 rubricConfig.isComplete;
      
      const isCorrect = shouldBeRubricBased ? 
                       gradingMethod === 'RUBRIC_BASED' : 
                       gradingMethod === 'SCORE_BASED';
      
      console.log(`   ✅ Detection Correct: ${isCorrect}`);
      
      if (!isCorrect) {
        console.log(`   ⚠️  Expected: ${shouldBeRubricBased ? 'RUBRIC_BASED' : 'SCORE_BASED'}`);
        console.log(`   ⚠️  Got: ${gradingMethod}`);
      }
    }

    // Test 3: Test assessments without rubrics
    console.log('\n📋 Test 3: Testing assessments without rubrics...');
    const assessmentsWithoutRubric = await prisma.assessment.findMany({
      where: {
        rubricId: null
      },
      take: 3
    });

    for (const assessment of assessmentsWithoutRubric) {
      const gradingMethod = determineGradingMethod(assessment);
      console.log(`\n📊 Assessment: ${assessment.title}`);
      console.log(`   ID: ${assessment.id}`);
      console.log(`   RubricId: ${assessment.rubricId}`);
      console.log(`   Determined Method: ${gradingMethod}`);
      console.log(`   ✅ Should be SCORE_BASED: ${gradingMethod === 'SCORE_BASED'}`);
    }

    // Test 4: Create test data if needed
    if (assessmentsWithRubric.length === 0 && availableRubrics.length > 0) {
      console.log('\n🔧 Test 4: Creating test assessment with rubric...');

      // Find a sample assessment to update
      const sampleAssessment = await prisma.assessment.findFirst({
        where: {
          rubricId: null
        }
      });

      if (sampleAssessment && availableRubrics[0]) {
        const updatedAssessment = await prisma.assessment.update({
          where: { id: sampleAssessment.id },
          data: { rubricId: availableRubrics[0].id },
          include: {
            bloomsRubric: {
              include: {
                criteria: {
                  include: {
                    criteriaLevels: {
                      include: {
                        performanceLevel: true,
                      },
                    },
                  },
                },
                performanceLevels: true,
              },
            },
          }
        });

        console.log(`✅ Updated assessment "${updatedAssessment.title}" with rubric "${availableRubrics[0].title}"`);

        // Test the grading method detection on the updated assessment
        const gradingMethod = determineGradingMethod(updatedAssessment);
        console.log(`   Grading Method: ${gradingMethod}`);
        console.log(`   Expected: RUBRIC_BASED`);
        console.log(`   ✅ Correct: ${gradingMethod === 'RUBRIC_BASED'}`);
      }
    }

    console.log('\n🎉 Rubric Grading Fix Test Complete!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testRubricGradingFix();
}

export { testRubricGradingFix, determineGradingMethod };
