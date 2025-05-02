
/**
 * Este script adiciona comandos ao package.json para verificar placeholders
 * Como não podemos editar package.json diretamente, esse script deve ser executado manualmente
 */

console.log(`
Para adicionar os scripts de verificação ao package.json, adicione manualmente estas linhas à seção "scripts":

"check:placeholders": "node scripts/check-placeholders.js",
"precommit": "node scripts/check-placeholders.js",
"prepare": "node scripts/install-hooks.js"

Exemplo de como deve ficar:

"scripts": {
  // ... scripts existentes
  "check:placeholders": "node scripts/check-placeholders.js",
  "precommit": "node scripts/check-placeholders.js",
  "prepare": "node scripts/install-hooks.js"
}
`);
