
/**
 * Script para verificar a presença de placeholders e textos fictícios no código
 * Este script pode ser executado como parte do processo de CI/CD ou como um hook de pré-commit
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Padrões a serem detectados
const patterns = [
  "lorem ipsum",
  "placeholder",
  "SelectValue>[^<]*<\\/SelectValue>", // SelectValue vazio
  "\\{\\s*\"\"\\s*\\}", // String vazia em JSX
  "dummy data",
  "mock data",
  "test data",
  "exemplo",
  "selecione um(a)?\\s*$" // Placeholder genérico
];

// Arquivos e pastas a serem ignoradas
const ignoredPaths = [
  'node_modules',
  'dist',
  'build',
  '.git',
  'scripts',
  'tests',
  '.next',
  'check-placeholders.js',
  'package.json',
  'package-lock.json',
  'README.md'
];

// Extensões de arquivos a serem verificadas
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.md'];

// Função para verificar se um arquivo deve ser ignorado
function shouldIgnoreFile(filePath) {
  return ignoredPaths.some(ignored => filePath.includes(ignored));
}

// Função para verificar um arquivo
function checkFile(filePath) {
  if (shouldIgnoreFile(filePath)) {
    return [];
  }

  const ext = path.extname(filePath);
  if (!fileExtensions.includes(ext)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  patterns.forEach(pattern => {
    const regex = new RegExp(pattern, 'gi');
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      const line = content.substring(0, match.index).split('\n').length;
      issues.push({
        file: filePath,
        line,
        pattern: match[0],
        suggestion: `Possível placeholder detectado: "${match[0]}"`
      });
    }
  });

  return issues;
}

// Função principal que verifica todos os arquivos
function checkAllFiles() {
  const srcDir = path.join(__dirname, '..', 'src');
  const results = [];

  function traverseDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        traverseDirectory(filePath);
      } else {
        const fileIssues = checkFile(filePath);
        results.push(...fileIssues);
      }
    });
  }

  traverseDirectory(srcDir);
  return results;
}

// Executar a verificação
const issues = checkAllFiles();

if (issues.length > 0) {
  console.log('\x1b[31m%s\x1b[0m', 'Foram encontrados possíveis placeholders:');
  
  issues.forEach(issue => {
    console.log('\x1b[33m%s\x1b[0m', `${issue.file}:${issue.line}`);
    console.log(`  ${issue.suggestion}`);
    console.log('');
  });
  
  console.log(`Total de problemas encontrados: ${issues.length}`);
  process.exit(1);
} else {
  console.log('\x1b[32m%s\x1b[0m', '✓ Nenhum placeholder detectado!');
}
