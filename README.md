# Projeto Web - GitHub Pages

Este é um projeto web construído com Vite e React, configurado para hospedagem no GitHub Pages.

## 🚀 Como usar no GitHub Pages

### 1. Subir para o GitHub

1. Crie um novo repositório no GitHub
2. Clone o repositório localmente ou faça upload dos arquivos
3. Faça commit e push de todos os arquivos

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### 2. Configurar GitHub Pages

1. Vá para as configurações do seu repositório no GitHub
2. Na seção "Pages" (no menu lateral esquerdo)
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione "main"
5. Em "Folder", selecione "/docs"
6. Clique em "Save"

### 3. Domínio personalizado (opcional)

Para usar seu próprio domínio:

1. Crie um arquivo `CNAME` na pasta `docs/` com seu domínio:
   ```
   seudominio.com
   ```

2. Configure seu DNS para apontar para o GitHub Pages:
   - Para domínio apex (exemplo.com): Crie registros A apontando para:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   
   - Para subdomínio (www.exemplo.com): Crie um registro CNAME apontando para:
     - SEU_USUARIO.github.io

3. Nas configurações do GitHub Pages, adicione seu domínio personalizado

## 🛠️ Desenvolvimento local

Para executar o projeto localmente:

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Fazer build para produção
npm run build
```

## 📁 Estrutura do projeto

- `src/` - Código fonte da aplicação
- `docs/` - Arquivos estáticos para GitHub Pages
- `public/` - Arquivos públicos
- `dist/` - Build de produção (ignorado no git)

## 🔧 Configurações importantes

- O arquivo `.nojekyll` na pasta `docs/` evita que o GitHub tente processar os arquivos com Jekyll
- O `.gitignore` está configurado para ignorar `node_modules`, `dist` e outros arquivos desnecessários
- Os arquivos de produção estão na pasta `docs/` para facilitar a configuração do GitHub Pages

## 📝 Notas

- Sempre faça o build (`npm run build`) antes de fazer commit das alterações
- Os arquivos na pasta `docs/` são gerados automaticamente pelo build
- Para atualizações, modifique apenas os arquivos em `src/` e refaça o build

