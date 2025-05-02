
/**
 * Script para instalar hooks de git
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Caminho para o diretório .git/hooks
const hooksDir = path.join(__dirname, '..', '.git', 'hooks');

// Criar o hook de pré-commit
const preCommitHookPath = path.join(hooksDir, 'pre-commit');
const preCommitHook = `#!/bin/sh
# Hook de pré-commit para verificar placeholders

echo "🔍 Verificando placeholders e campos vazios..."
node scripts/check-placeholders.js

# Se o script anterior falhar, abortar o commit
if [ $? -ne 0 ]; then
  echo "❌ Commit abortado: por favor corrija os placeholders detectados."
  exit 1
fi

echo "✅ Todos os checks passaram. Prosseguindo com o commit."
exit 0
`;

console.log('Instalando hook de pre-commit...');
fs.writeFileSync(preCommitHookPath, preCommitHook);
fs.chmodSync(preCommitHookPath, '755');

console.log('✅ Hooks instalados com sucesso!');
