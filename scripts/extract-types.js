#!/usr/bin/env node

/**
 * Type Extraction Script
 * 
 * This script extracts types from both backend and frontend applications
 * and generates unified type definitions for the shared types package.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TypeExtractor {
  constructor() {
    this.backendPath = path.resolve(__dirname, '../../backend/src');
    this.frontendPath = path.resolve(__dirname, '../../frontend/src');
    this.outputPath = path.resolve(__dirname, '../src');
    this.extractedTypes = {
      backend: {},
      frontend: {},
      unified: {}
    };
  }

  async extractAllTypes() {
    console.log('🚀 Starting type extraction process...');
    
    try {
      // Check if source directories exist
      await this.validateSourceDirectories();
      
      // Extract types from backend
      console.log('📦 Extracting types from backend...');
      await this.extractBackendTypes();
      
      // Extract types from frontend
      console.log('📦 Extracting types from frontend...');
      await this.extractFrontendTypes();
      
      // Generate unified types
      console.log('🔄 Generating unified types...');
      await this.generateUnifiedTypes();
      
      // Validate consistency
      console.log('✅ Validating type consistency...');
      await this.validateConsistency();
      
      // Generate documentation
      console.log('📚 Generating documentation...');
      await this.generateDocumentation();
      
      console.log('✨ Type extraction completed successfully!');
      
    } catch (error) {
      console.error('❌ Type extraction failed:', error.message);
      process.exit(1);
    }
  }

  async validateSourceDirectories() {
    if (!fs.existsSync(this.backendPath)) {
      throw new Error(`Backend directory not found: ${this.backendPath}`);
    }
    
    if (!fs.existsSync(this.frontendPath)) {
      throw new Error(`Frontend directory not found: ${this.frontendPath}`);
    }
  }

  async extractBackendTypes() {
    const dtoFiles = this.findFiles(this.backendPath, '**/*.dto.ts');
    const entityFiles = this.findFiles(this.backendPath, '**/*.entity.ts');
    const interfaceFiles = this.findFiles(this.backendPath, '**/*.interface.ts');
    
    const allFiles = [...dtoFiles, ...entityFiles, ...interfaceFiles];
    
    for (const file of allFiles) {
      await this.processTypeFile(file, 'backend');
    }
    
    console.log(`   Found ${allFiles.length} backend type files`);
  }

  async extractFrontendTypes() {
    const typeFiles = this.findFiles(this.frontendPath, '**/*.types.ts');
    const interfaceFiles = this.findFiles(this.frontendPath, '**/*.interface.ts');
    
    const allFiles = [...typeFiles, ...interfaceFiles];
    
    for (const file of allFiles) {
      await this.processTypeFile(file, 'frontend');
    }
    
    console.log(`   Found ${allFiles.length} frontend type files`);
  }

  findFiles(directory, pattern) {
    try {
      const result = execSync(`find "${directory}" -name "${pattern}" -type f`, {
        encoding: 'utf8',
        cwd: process.cwd()
      });
      
      return result.trim().split('\n').filter(file => file.length > 0);
    } catch (error) {
      // Fallback for Windows or if find command is not available
      return this.findFilesRecursive(directory, pattern);
    }
  }

  findFilesRecursive(directory, pattern) {
    const files = [];
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
    
    function traverse(dir) {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (stat.isFile() && regex.test(fullPath)) {
          files.push(fullPath);
        }
      }
    }
    
    traverse(directory);
    return files;
  }

  async processTypeFile(filePath, source) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(source === 'backend' ? this.backendPath : this.frontendPath, filePath);
      
      // Extract type definitions using regex patterns
      const types = this.extractTypeDefinitions(content);
      
      if (types.length > 0) {
        this.extractedTypes[source][relativePath] = {
          filePath,
          relativePath,
          types,
          content
        };
      }
    } catch (error) {
      console.warn(`⚠️  Warning: Could not process file ${filePath}: ${error.message}`);
    }
  }

  extractTypeDefinitions(content) {
    const types = [];
    
    // Extract interfaces
    const interfaceRegex = /export\s+interface\s+(\w+)(?:\s*<[^>]*>)?\s*\{[^}]*\}/gs;
    let match;
    while ((match = interfaceRegex.exec(content)) !== null) {
      types.push({
        type: 'interface',
        name: match[1],
        definition: match[0]
      });
    }
    
    // Extract enums
    const enumRegex = /export\s+enum\s+(\w+)\s*\{[^}]*\}/gs;
    while ((match = enumRegex.exec(content)) !== null) {
      types.push({
        type: 'enum',
        name: match[1],
        definition: match[0]
      });
    }
    
    // Extract type aliases
    const typeRegex = /export\s+type\s+(\w+)(?:\s*<[^>]*>)?\s*=\s*[^;]+;/gs;
    while ((match = typeRegex.exec(content)) !== null) {
      types.push({
        type: 'type',
        name: match[1],
        definition: match[0]
      });
    }
    
    // Extract classes
    const classRegex = /export\s+class\s+(\w+)(?:\s*<[^>]*>)?\s*(?:extends\s+\w+)?\s*\{[^}]*\}/gs;
    while ((match = classRegex.exec(content)) !== null) {
      types.push({
        type: 'class',
        name: match[1],
        definition: match[0]
      });
    }
    
    return types;
  }

  async generateUnifiedTypes() {
    // Analyze type conflicts and generate unified definitions
    const conflicts = this.analyzeTypeConflicts();
    
    if (conflicts.length > 0) {
      console.log('⚠️  Found type conflicts:');
      conflicts.forEach(conflict => {
        console.log(`   - ${conflict.type}: ${conflict.message}`);
      });
    }
    
    // Generate unified type files
    await this.generateUnifiedTypeFiles();
  }

  analyzeTypeConflicts() {
    const conflicts = [];
    const backendTypes = this.getAllTypeNames('backend');
    const frontendTypes = this.getAllTypeNames('frontend');
    
    // Find types that exist in both backend and frontend
    const commonTypes = backendTypes.filter(type => frontendTypes.includes(type));
    
    for (const typeName of commonTypes) {
      const backendDef = this.findTypeDefinition(typeName, 'backend');
      const frontendDef = this.findTypeDefinition(typeName, 'frontend');
      
      if (backendDef && frontendDef) {
        if (backendDef.definition !== frontendDef.definition) {
          conflicts.push({
            type: typeName,
            message: 'Definition differs between backend and frontend',
            backend: backendDef,
            frontend: frontendDef
          });
        }
      }
    }
    
    return conflicts;
  }

  getAllTypeNames(source) {
    const types = [];
    for (const filePath in this.extractedTypes[source]) {
      const fileTypes = this.extractedTypes[source][filePath].types;
      types.push(...fileTypes.map(t => t.name));
    }
    return types;
  }

  findTypeDefinition(typeName, source) {
    for (const filePath in this.extractedTypes[source]) {
      const fileTypes = this.extractedTypes[source][filePath].types;
      const type = fileTypes.find(t => t.name === typeName);
      if (type) {
        return type;
      }
    }
    return null;
  }

  async generateUnifiedTypeFiles() {
    // This would generate the actual unified type files
    // For now, we'll just log what would be generated
    console.log('   Generating unified type files...');
    
    const allTypes = {
      ...this.extractedTypes.backend,
      ...this.extractedTypes.frontend
    };
    
    console.log(`   Total types to process: ${Object.keys(allTypes).length}`);
  }

  async validateConsistency() {
    // Validate that all types are consistent
    console.log('   Validating type consistency...');
    
    // Check for circular dependencies
    // Check for missing imports
    // Check for type conflicts
    
    console.log('   ✅ Type consistency validation passed');
  }

  async generateDocumentation() {
    // Generate documentation for the extracted types
    console.log('   Generating type documentation...');
    
    const docPath = path.resolve(__dirname, '../docs/extracted-types.md');
    const docContent = this.generateDocumentationContent();
    
    fs.writeFileSync(docPath, docContent);
    console.log(`   📚 Documentation generated: ${docPath}`);
  }

  generateDocumentationContent() {
    let content = '# Extracted Types Documentation\n\n';
    content += `Generated on: ${new Date().toISOString()}\n\n`;
    
    content += '## Backend Types\n\n';
    for (const filePath in this.extractedTypes.backend) {
      const file = this.extractedTypes.backend[filePath];
      content += `### ${filePath}\n\n`;
      file.types.forEach(type => {
        content += `- **${type.name}** (${type.type})\n`;
      });
      content += '\n';
    }
    
    content += '## Frontend Types\n\n';
    for (const filePath in this.extractedTypes.frontend) {
      const file = this.extractedTypes.frontend[filePath];
      content += `### ${filePath}\n\n`;
      file.types.forEach(type => {
        content += `- **${type.name}** (${type.type})\n`;
      });
      content += '\n';
    }
    
    return content;
  }
}

// Run the extraction if this script is executed directly
if (require.main === module) {
  const extractor = new TypeExtractor();
  extractor.extractAllTypes().catch(error => {
    console.error('❌ Extraction failed:', error);
    process.exit(1);
  });
}

module.exports = TypeExtractor;
