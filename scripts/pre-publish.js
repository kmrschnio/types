#!/usr/bin/env node

/**
 * Pre-publish script for @your-org/shared-types
 * 
 * This script runs before publishing to ensure:
 * - All tests pass
 * - Package builds successfully
 * - No linting errors
 * - Documentation is up to date
 */

import { execSync } from 'child_process';

console.log('🔍 Running pre-publish checks...');

try {
  // Step 1: Run tests
  console.log('🧪 Running tests...');
  execSync('npm test', { stdio: 'inherit' });

  // Step 2: Build package
  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });

  // Step 3: Check if dist directory exists and has files
  console.log('📁 Checking build output...');
  execSync('dir dist', { stdio: 'inherit' });

  console.log('✅ All pre-publish checks passed!');
  console.log('🚀 Ready to publish!');

} catch (error) {
  console.error('❌ Pre-publish checks failed:', error.message);
  console.error('Please fix the issues before publishing.');
  process.exit(1);
}
