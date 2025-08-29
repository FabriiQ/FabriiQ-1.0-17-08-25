#!/usr/bin/env node

/**
 * Test Supabase Storage Connection
 * Verifies that storage buckets are accessible and URLs are working
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testStorageConnection() {
  console.log('🔍 Testing Supabase Storage Connection...\n');

  try {
    // Test 1: List buckets
    console.log('1. Testing bucket access...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Failed to list buckets:', listError.message);
      return false;
    }

    console.log('✅ Successfully connected to storage');
    console.log(`   Found ${buckets.length} buckets:`, buckets.map(b => b.name).join(', '));

    // Test 2: Check assessments bucket specifically
    console.log('\n2. Testing assessments bucket...');
    const assessmentsBucket = buckets.find(b => b.name === 'assessments');
    
    if (!assessmentsBucket) {
      console.error('❌ Assessments bucket not found');
      return false;
    }

    console.log('✅ Assessments bucket found');
    console.log('   Bucket details:', {
      name: assessmentsBucket.name,
      id: assessmentsBucket.id,
      public: assessmentsBucket.public,
      created_at: assessmentsBucket.created_at
    });

    // Test 3: List files in assessments bucket
    console.log('\n3. Testing file listing in assessments bucket...');
    const { data: files, error: filesError } = await supabase.storage
      .from('assessments')
      .list('', { limit: 10 });

    if (filesError) {
      console.error('❌ Failed to list files:', filesError.message);
      return false;
    }

    console.log('✅ Successfully listed files in assessments bucket');
    console.log(`   Found ${files.length} items`);

    if (files.length > 0) {
      console.log('   Sample files:');
      files.slice(0, 3).forEach(file => {
        console.log(`   - ${file.name} (${file.metadata?.size || 'unknown size'})`);
      });
    }

    // Test 4: Test URL generation
    console.log('\n4. Testing URL generation...');
    const testPath = 'test/sample.txt';
    const { data: urlData } = supabase.storage
      .from('assessments')
      .getPublicUrl(testPath);

    console.log('✅ URL generation working');
    console.log('   Sample URL:', urlData.publicUrl);

    // Test 5: Check environment variables
    console.log('\n5. Checking environment configuration...');
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    let envOk = true;
    requiredEnvVars.forEach(envVar => {
      if (!process.env[envVar]) {
        console.error(`❌ Missing environment variable: ${envVar}`);
        envOk = false;
      } else {
        console.log(`✅ ${envVar} is set`);
      }
    });

    if (!envOk) {
      return false;
    }

    console.log('\n🎉 All storage tests passed!');
    console.log('\n📋 Summary:');
    console.log('   - Storage connection: ✅ Working');
    console.log('   - Assessments bucket: ✅ Accessible');
    console.log('   - File operations: ✅ Working');
    console.log('   - URL generation: ✅ Working');
    console.log('   - Environment: ✅ Configured');

    return true;

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

// Run the test
testStorageConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });
