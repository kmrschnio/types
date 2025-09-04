#!/usr/bin/env node

/**
 * Publishing script for @your-org/shared-types
 * 
 * This script handles the publishing process including:
 * - Version bumping
 * - Building the package
 * - Running tests
 * - Publishing to npm
 * - Creating git tags
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const packageJsonPath = join(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const versionType = process.argv[2] || 'patch'; // patch, minor, major

if (!['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Invalid version type. Use: patch, minor, or major');
  process.exit(1);
}

console.log(`🚀 Publishing ${packageJson.name} v${packageJson.version}...`);

try {
  // Step 1: Run tests
  console.log('📋 Running tests...');
  execSync('npm test', { stdio: 'inherit' });

  // Step 2: Build the package
  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });

  // Step 3: Bump version
  console.log(`📈 Bumping ${versionType} version...`);
  execSync(`npm version ${versionType}`, { stdio: 'inherit' });

  // Step 4: Publish to npm
  console.log('📦 Publishing to npm...');
  execSync('npm publish', { stdio: 'inherit' });

  // Step 5: Push to git
  console.log('📤 Pushing to git...');
  execSync('git push origin main --tags', { stdio: 'inherit' });

  console.log('✅ Successfully published!');
  console.log(`📦 Package: ${packageJson.name}`);
  console.log(`🏷️  Version: ${packageJson.version}`);
  console.log(`🔗 npm: https://www.npmjs.com/package/${packageJson.name}`);

} catch (error) {
  console.error('❌ Publishing failed:', error.message);
  process.exit(1);
}
