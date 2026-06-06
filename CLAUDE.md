# Preferências e Regras do Workspace

## Regra: Commit automático no Git

**Sempre que um novo recurso for criado ou modificado** (workflow n8n, arquivo, script, etc.), salvar automaticamente no repositório Git local com:

1. Exportar/salvar o arquivo correspondente em `C:\Users\user\Desktop\Claude\`
2. Fazer `git add` do arquivo
3. Fazer `git commit` com mensagem descritiva no formato:
   - `feat: <descrição>` para recursos novos
   - `fix: <descrição>` para correções
   - `update: <descrição>` para modificações

**Repositório:** `C:\Users\user\Desktop\Claude\` (já inicializado com `git init`)
**Configuração:** user.email = corpore.saojose@gmail.com / user.name = Corpore
