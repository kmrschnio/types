#!/usr/bin/env node

/**
 * Release Script
 * 
 * This script handles the release process for the shared types package,
 * including version bumping, building, testing, and publishing.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ReleaseManager {
  constructor() {
    this.packagePath = path.resolve(__dirname, '..');
    this.packageJsonPath = path.join(this.packagePath, 'package.json');
    this.packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
  }

  async release(versionType = 'patch') {
    console.log('🚀 Starting release process...');
    
    try {
      // Validate current state
      await this.validateReleaseState();
      
      // Extract and validate types
      await this.extractAndValidateTypes();
      
      // Run tests
      await this.runTests();
      
      // Build package
      await this.buildPackage();
      
      // Bump version
      const newVersion = await this.bumpVersion(versionType);
      
      // Update changelog
      await this.updateChangelog(newVersion);
      
      // Commit changes
      await this.commitChanges(newVersion);
      
      // Create git tag
      await this.createGitTag(newVersion);
      
      // Publish to npm
      await this.publishToNpm();
      
      console.log(`✨ Release ${newVersion} completed successfully!`);
      
    } catch (error) {
      console.error('❌ Release failed:', error.message);
      process.exit(1);
    }
  }

  async validateReleaseState() {
    console.log('🔍 Validating release state...');
    
    // Check if working directory is clean
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        throw new Error('Working directory is not clean. Please commit or stash changes.');
      }
    } catch (error) {
      throw new Error('Failed to check git status: ' + error.message);
    }
    
    // Check if we're on main branch
    try {
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      if (branch !== 'main' && branch !== 'master') {
        throw new Error(`Not on main branch. Current branch: ${branch}`);
      }
    } catch (error) {
      throw new Error('Failed to check current branch: ' + error.message);
    }
    
    console.log('   ✅ Release state validation passed');
  }

  async extractAndValidateTypes() {
    console.log('📦 Extracting and validating types...');
    
    try {
      // Run type extraction
      execSync('npm run extract-types', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      // Run consistency validation
      execSync('npm run validate-consistency', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      console.log('   ✅ Type extraction and validation completed');
    } catch (error) {
      throw new Error('Type extraction or validation failed: ' + error.message);
    }
  }

  async runTests() {
    console.log('🧪 Running tests...');
    
    try {
      execSync('npm test', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      console.log('   ✅ Tests passed');
    } catch (error) {
      throw new Error('Tests failed: ' + error.message);
    }
  }

  async buildPackage() {
    console.log('🔨 Building package...');
    
    try {
      // Clean previous build
      execSync('npm run clean', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      // Build package
      execSync('npm run build', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      console.log('   ✅ Package built successfully');
    } catch (error) {
      throw new Error('Build failed: ' + error.message);
    }
  }

  async bumpVersion(versionType) {
    console.log(`📈 Bumping version (${versionType})...`);
    
    try {
      // Validate version type
      const validTypes = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'];
      if (!validTypes.includes(versionType)) {
        throw new Error(`Invalid version type: ${versionType}. Valid types: ${validTypes.join(', ')}`);
      }
      
      // Bump version
      const output = execSync(`npm version ${versionType} --no-git-tag-version`, { 
        cwd: this.packagePath,
        encoding: 'utf8'
      });
      
      const newVersion = output.trim().replace('v', '');
      console.log(`   ✅ Version bumped to ${newVersion}`);
      
      return newVersion;
    } catch (error) {
      throw new Error('Version bump failed: ' + error.message);
    }
  }

  async updateChangelog(version) {
    console.log('📝 Updating changelog...');
    
    const changelogPath = path.join(this.packagePath, 'CHANGELOG.md');
    const date = new Date().toISOString().split('T')[0];
    
    let changelogContent = '';
    
    if (fs.existsSync(changelogPath)) {
      changelogContent = fs.readFileSync(changelogPath, 'utf8');
    } else {
      changelogContent = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n';
    }
    
    // Add new version entry
    const newEntry = `## [${version}] - ${date}\n\n### Added\n- Initial release of shared types package\n\n### Changed\n- N/A\n\n### Deprecated\n- N/A\n\n### Removed\n- N/A\n\n### Fixed\n- N/A\n\n`;
    
    // Insert new entry after the header
    const lines = changelogContent.split('\n');
    const headerEndIndex = lines.findIndex(line => line.startsWith('## ['));
    
    if (headerEndIndex === -1) {
      changelogContent = changelogContent + '\n' + newEntry;
    } else {
      lines.splice(headerEndIndex, 0, newEntry);
      changelogContent = lines.join('\n');
    }
    
    fs.writeFileSync(changelogPath, changelogContent);
    console.log('   ✅ Changelog updated');
  }

  async commitChanges(version) {
    console.log('💾 Committing changes...');
    
    try {
      // Add all changes
      execSync('git add .', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      // Commit changes
      execSync(`git commit -m "chore: release version ${version}"`, { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      console.log('   ✅ Changes committed');
    } catch (error) {
      throw new Error('Commit failed: ' + error.message);
    }
  }

  async createGitTag(version) {
    console.log('🏷️  Creating git tag...');
    
    try {
      execSync(`git tag -a "v${version}" -m "Release version ${version}"`, { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      console.log('   ✅ Git tag created');
    } catch (error) {
      throw new Error('Git tag creation failed: ' + error.message);
    }
  }

  async publishToNpm() {
    console.log('📦 Publishing to npm...');
    
    try {
      // Check if user is logged in to npm
      try {
        execSync('npm whoami', { 
          cwd: this.packagePath,
          stdio: 'pipe'
        });
      } catch (error) {
        throw new Error('Not logged in to npm. Please run "npm login" first.');
      }
      
      // Publish to npm
      execSync('npm publish', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      console.log('   ✅ Published to npm');
    } catch (error) {
      throw new Error('NPM publish failed: ' + error.message);
    }
  }

  async pushToRemote() {
    console.log('🚀 Pushing to remote repository...');
    
    try {
      // Push commits
      execSync('git push origin main', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      // Push tags
      execSync('git push origin --tags', { 
        cwd: this.packagePath,
        stdio: 'inherit'
      });
      
      console.log('   ✅ Pushed to remote repository');
    } catch (error) {
      throw new Error('Push to remote failed: ' + error.message);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const versionType = args[0] || 'patch';

// Run the release if this script is executed directly
if (require.main === module) {
  const releaseManager = new ReleaseManager();
  releaseManager.release(versionType).catch(error => {
    console.error('❌ Release failed:', error);
    process.exit(1);
  });
}

module.exports = ReleaseManager;
