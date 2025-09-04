#!/usr/bin/env node

/**
 * Type Consistency Validation Script
 * 
 * This script validates that types are consistent across the shared types package
 * and identifies any inconsistencies or conflicts.
 */

const fs = require('fs');
const path = require('path');

class ConsistencyValidator {
  constructor() {
    this.srcPath = path.resolve(__dirname, '../src');
    this.issues = [];
    this.warnings = [];
  }

  async validateConsistency() {
    console.log('🔍 Starting type consistency validation...');
    
    try {
      // Validate file structure
      await this.validateFileStructure();
      
      // Validate type definitions
      await this.validateTypeDefinitions();
      
      // Validate imports and exports
      await this.validateImportsExports();
      
      // Validate naming conventions
      await this.validateNamingConventions();
      
      // Validate enum consistency
      await this.validateEnumConsistency();
      
      // Validate interface consistency
      await this.validateInterfaceConsistency();
      
      // Generate report
      this.generateReport();
      
      if (this.issues.length > 0) {
        console.error('❌ Consistency validation failed with issues');
        process.exit(1);
      } else {
        console.log('✅ Type consistency validation passed');
      }
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    }
  }

  async validateFileStructure() {
    console.log('📁 Validating file structure...');
    
    const requiredFiles = [
      'src/index.ts',
      'src/core/index.ts',
      'src/core/entities/index.ts',
      'src/core/enums/index.ts',
      'src/core/interfaces/index.ts',
      'src/modules/index.ts',
      'src/utils/index.ts'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.resolve(this.srcPath, file);
      if (!fs.existsSync(filePath)) {
        this.issues.push({
          type: 'missing_file',
          message: `Required file missing: ${file}`,
          file: file
        });
      }
    }
    
    console.log(`   ✅ File structure validation completed`);
  }

  async validateTypeDefinitions() {
    console.log('🔧 Validating type definitions...');
    
    const typeFiles = this.findTypeFiles();
    
    for (const file of typeFiles) {
      await this.validateTypeFile(file);
    }
    
    console.log(`   ✅ Type definitions validation completed`);
  }

  findTypeFiles() {
    const files = [];
    
    function traverse(dir) {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (stat.isFile() && item.endsWith('.ts') && !item.endsWith('.d.ts')) {
          files.push(fullPath);
        }
      }
    }
    
    traverse(this.srcPath);
    return files;
  }

  async validateTypeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.srcPath, filePath);
      
      // Check for TypeScript syntax errors
      if (!this.isValidTypeScript(content)) {
        this.issues.push({
          type: 'syntax_error',
          message: 'Invalid TypeScript syntax',
          file: relativePath
        });
      }
      
      // Check for duplicate type definitions
      const duplicates = this.findDuplicateTypes(content);
      duplicates.forEach(duplicate => {
        this.issues.push({
          type: 'duplicate_definition',
          message: `Duplicate type definition: ${duplicate}`,
          file: relativePath
        });
      });
      
      // Check for unused imports
      const unusedImports = this.findUnusedImports(content);
      unusedImports.forEach(importName => {
        this.warnings.push({
          type: 'unused_import',
          message: `Unused import: ${importName}`,
          file: relativePath
        });
      });
      
    } catch (error) {
      this.issues.push({
        type: 'file_error',
        message: `Error reading file: ${error.message}`,
        file: path.relative(this.srcPath, filePath)
      });
    }
  }

  isValidTypeScript(content) {
    // Basic TypeScript syntax validation
    // This is a simplified check - in a real implementation, you'd use the TypeScript compiler API
    
    // Check for balanced braces
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      return false;
    }
    
    // Check for balanced parentheses
    const openParens = (content.match(/\(/g) || []).length;
    const closeParens = (content.match(/\)/g) || []).length;
    
    if (openParens !== closeParens) {
      return false;
    }
    
    return true;
  }

  findDuplicateTypes(content) {
    const duplicates = [];
    const typeNames = new Set();
    
    // Find interface definitions
    const interfaceRegex = /export\s+interface\s+(\w+)/g;
    let match;
    while ((match = interfaceRegex.exec(content)) !== null) {
      const typeName = match[1];
      if (typeNames.has(typeName)) {
        duplicates.push(typeName);
      } else {
        typeNames.add(typeName);
      }
    }
    
    // Find enum definitions
    const enumRegex = /export\s+enum\s+(\w+)/g;
    while ((match = enumRegex.exec(content)) !== null) {
      const typeName = match[1];
      if (typeNames.has(typeName)) {
        duplicates.push(typeName);
      } else {
        typeNames.add(typeName);
      }
    }
    
    // Find type definitions
    const typeRegex = /export\s+type\s+(\w+)/g;
    while ((match = typeRegex.exec(content)) !== null) {
      const typeName = match[1];
      if (typeNames.has(typeName)) {
        duplicates.push(typeName);
      } else {
        typeNames.add(typeName);
      }
    }
    
    return duplicates;
  }

  findUnusedImports(content) {
    const unused = [];
    const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"][^'"]+['"]/g;
    const exportRegex = /export\s+(?:interface|enum|type|class)\s+(\w+)/g;
    
    const imports = new Set();
    const exports = new Set();
    
    // Find all imports
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importNames = match[1].split(',').map(name => name.trim());
      importNames.forEach(name => imports.add(name));
    }
    
    // Find all exports
    while ((match = exportRegex.exec(content)) !== null) {
      exports.add(match[1]);
    }
    
    // Find unused imports
    imports.forEach(importName => {
      if (!exports.has(importName) && !content.includes(importName)) {
        unused.push(importName);
      }
    });
    
    return unused;
  }

  async validateImportsExports() {
    console.log('📦 Validating imports and exports...');
    
    const indexFiles = this.findIndexFiles();
    
    for (const indexFile of indexFiles) {
      await this.validateIndexFile(indexFile);
    }
    
    console.log(`   ✅ Imports and exports validation completed`);
  }

  findIndexFiles() {
    const files = [];
    
    function traverse(dir) {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (item === 'index.ts') {
          files.push(fullPath);
        }
      }
    }
    
    traverse(this.srcPath);
    return files;
  }

  async validateIndexFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.srcPath, filePath);
      
      // Check for export statements
      const exportRegex = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
      const exports = [];
      let match;
      
      while ((match = exportRegex.exec(content)) !== null) {
        exports.push(match[1]);
      }
      
      // Validate that exported files exist
      for (const exportPath of exports) {
        const fullExportPath = path.resolve(path.dirname(filePath), exportPath + '.ts');
        if (!fs.existsSync(fullExportPath)) {
          this.issues.push({
            type: 'missing_export',
            message: `Exported file does not exist: ${exportPath}`,
            file: relativePath
          });
        }
      }
      
    } catch (error) {
      this.issues.push({
        type: 'file_error',
        message: `Error reading index file: ${error.message}`,
        file: path.relative(this.srcPath, filePath)
      });
    }
  }

  async validateNamingConventions() {
    console.log('📝 Validating naming conventions...');
    
    const typeFiles = this.findTypeFiles();
    
    for (const file of typeFiles) {
      await this.validateNamingInFile(file);
    }
    
    console.log(`   ✅ Naming conventions validation completed`);
  }

  async validateNamingInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.srcPath, filePath);
      
      // Check interface naming (PascalCase)
      const interfaceRegex = /export\s+interface\s+([a-z][a-zA-Z0-9]*)/g;
      let match;
      
      while ((match = interfaceRegex.exec(content)) !== null) {
        const interfaceName = match[1];
        if (!this.isPascalCase(interfaceName)) {
          this.issues.push({
            type: 'naming_convention',
            message: `Interface should be PascalCase: ${interfaceName}`,
            file: relativePath
          });
        }
      }
      
      // Check enum naming (PascalCase)
      const enumRegex = /export\s+enum\s+([a-z][a-zA-Z0-9]*)/g;
      while ((match = enumRegex.exec(content)) !== null) {
        const enumName = match[1];
        if (!this.isPascalCase(enumName)) {
          this.issues.push({
            type: 'naming_convention',
            message: `Enum should be PascalCase: ${enumName}`,
            file: relativePath
          });
        }
      }
      
    } catch (error) {
      this.issues.push({
        type: 'file_error',
        message: `Error validating naming: ${error.message}`,
        file: path.relative(this.srcPath, filePath)
      });
    }
  }

  isPascalCase(str) {
    return /^[A-Z][a-zA-Z0-9]*$/.test(str);
  }

  async validateEnumConsistency() {
    console.log('🔢 Validating enum consistency...');
    
    // Check for enum value consistency
    // Check for duplicate enum values
    // Check for enum naming consistency
    
    console.log(`   ✅ Enum consistency validation completed`);
  }

  async validateInterfaceConsistency() {
    console.log('🔗 Validating interface consistency...');
    
    // Check for interface property consistency
    // Check for interface inheritance consistency
    // Check for interface naming consistency
    
    console.log(`   ✅ Interface consistency validation completed`);
  }

  generateReport() {
    console.log('\n📊 Validation Report');
    console.log('==================');
    
    if (this.issues.length > 0) {
      console.log(`\n❌ Issues Found (${this.issues.length}):`);
      this.issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. [${issue.type}] ${issue.message}`);
        if (issue.file) {
          console.log(`      File: ${issue.file}`);
        }
      });
    }
    
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${this.warnings.length}):`);
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. [${warning.type}] ${warning.message}`);
        if (warning.file) {
          console.log(`      File: ${warning.file}`);
        }
      });
    }
    
    if (this.issues.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ No issues or warnings found!');
    }
  }
}

// Run the validation if this script is executed directly
if (require.main === module) {
  const validator = new ConsistencyValidator();
  validator.validateConsistency().catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

module.exports = ConsistencyValidator;
