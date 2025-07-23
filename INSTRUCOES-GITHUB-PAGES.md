# 🚀 Instruções para Hospedar no GitHub Pages

## Resumo do que foi feito

Seu projeto foi transformado e otimizado para funcionar perfeitamente no GitHub Pages. Aqui estão as principais modificações:

### ✅ Arquivos criados/modificados:
- **`docs/`** - Pasta com os arquivos estáticos prontos para GitHub Pages
- **`docs/.nojekyll`** - Evita processamento Jekyll desnecessário
- **`.gitignore`** - Configurado para ignorar arquivos desnecessários
- **`README.md`** - Documentação completa do projeto
- **`vite.config.js`** - **Adicionada a propriedade `base`** para garantir que os assets sejam carregados corretamente no GitHub Pages.

### ✅ Estrutura otimizada:
- Build de produção gerado na pasta `docs/`
- Arquivos CSS e JS minificados e otimizados
- Configuração adequada para hospedagem estática

## 📋 Passo a passo para subir no GitHub

### 1. Criar repositório no GitHub
1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository" (botão verde)
3. Dê um nome ao repositório (ex: `meu-site-producao`)
4. Deixe como **público** (necessário para GitHub Pages gratuito)
5. **NÃO** marque "Add a README file"
6. Clique em "Create repository"

### 2. Fazer upload dos arquivos
Você tem duas opções:

#### Opção A: Upload via interface web (mais fácil)
1. Na página do repositório recém-criado, clique em "uploading an existing file"
2. Extraia o arquivo `producaoacav1-main-corrigido.zip` no seu computador
3. Arraste todos os arquivos para a área de upload
4. Escreva uma mensagem de commit (ex: "Adicionar projeto inicial")
5. Clique em "Commit changes"

#### Opção B: Via linha de comando (se você tem Git instalado)
```bash
# Extrair o ZIP no seu computador
# Navegar até a pasta extraída no terminal
git init
git add .
git commit -m "Adicionar projeto inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### 3. Configurar GitHub Pages
1. No seu repositório, vá em **Settings** (aba no topo)
2. Role para baixo até encontrar **"Pages"** no menu lateral esquerdo
3. Em **"Source"**, selecione **"Deploy from a branch"**
4. Em **"Branch"**, selecione **"main"**
5. Em **"Folder"**, selecione **"/docs"**
6. Clique em **"Save"**

### 4. Aguardar deploy
- O GitHub levará alguns minutos para fazer o deploy
- Você verá uma mensagem verde com o link do seu site
- O link será algo como: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO`

## 🌐 Configurar domínio personalizado (opcional)

Se você tem um domínio próprio:

### 1. Criar arquivo CNAME
1. Na pasta `docs/` do seu repositório, crie um arquivo chamado `CNAME`
2. Dentro do arquivo, coloque apenas seu domínio:
   ```
   meusite.com
   ```
   ou
   ```
   www.meusite.com
   ```

### 2. Configurar DNS
No painel do seu provedor de domínio:

**Para domínio principal (exemplo.com):**
- Crie registros A apontando para:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

**Para subdomínio (www.exemplo.com):**
- Crie um registro CNAME apontando para: `SEU_USUARIO.github.io`

### 3. Configurar no GitHub
1. Nas configurações do GitHub Pages
2. Em "Custom domain", digite seu domínio
3. Marque "Enforce HTTPS"
4. Salve as configurações

## 🔄 Como atualizar o site

Sempre que quiser fazer alterações:

1. **Modifique os arquivos** na pasta `src/`
2. **Execute o build**: `npm run build`
3. **Copie os arquivos**: `cp -r dist/* docs/`
4. **Faça commit** das alterações
5. **Push** para o GitHub

O site será atualizado automaticamente!

## ⚠️ Pontos importantes

- **Sempre use a pasta `docs/`** - É onde estão os arquivos que o GitHub Pages serve
- **Não modifique diretamente os arquivos em `docs/`** - Eles são gerados automaticamente
- **Faça backup** do seu projeto antes de grandes alterações
- **Teste localmente** com `npm run preview` antes de fazer deploy
- **Lembre-se de substituir `/SEU_REPOSITORIO/`** no `vite.config.js` pelo nome real do seu repositório no GitHub.

## 🆘 Solução de problemas

### Site não carrega
- Verifique se a configuração do GitHub Pages está correta
- Aguarde alguns minutos após o deploy
- Verifique se não há erros na aba "Actions" do repositório
- **Verifique se você substituiu `/SEU_REPOSITORIO/` no `vite.config.js` pelo nome do seu repositório.**

### Domínio personalizado não funciona
- Verifique se o arquivo CNAME está correto
- Confirme as configurações de DNS
- Aguarde até 24h para propagação do DNS

### Alterações não aparecem
- Limpe o cache do navegador (Ctrl+F5)
- Verifique se fez commit e push das alterações
- Aguarde alguns minutos para o deploy

## 📞 Suporte

Se tiver dúvidas, consulte a [documentação oficial do GitHub Pages](https://docs.github.com/pt/pages).

---

**Seu projeto está pronto para o GitHub Pages! 🎉**

