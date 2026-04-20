# Como hospedar no Railway

## Passo a passo

### 1. Crie uma conta no Railway
Acesse: https://railway.app e crie sua conta (pode usar o GitHub).

### 2. Revogue o token antigo (IMPORTANTE!)
- Acesse: https://discord.com/developers/applications
- Selecione seu bot
- Vá em **Bot** > clique em **Reset Token**
- Copie o novo token

### 3. Suba o código para o GitHub
- Crie um repositório no GitHub (https://github.com/new)
- Faça upload de todos os arquivos desta pasta `artifacts/discord-bot/`
- Você pode usar o GitHub Desktop ou arrastar os arquivos pelo site

### 4. Crie um projeto no Railway
- No Railway, clique em **New Project**
- Escolha **Deploy from GitHub repo**
- Selecione o repositório que você criou

### 5. Configure a variável de ambiente
- No painel do Railway, clique no seu serviço
- Vá em **Variables**
- Adicione: `DISCORD_TOKEN` = (cole seu novo token aqui)

### 6. Selecione o plano pago
- Para hospedar por mais de 1 mês sem parar, você precisa do plano **Hobby** ($5/mês)
- O plano gratuito tem apenas 500 horas por mês (não é suficiente para 1 mês inteiro)
- Vá em **Account Settings** > **Billing** > **Upgrade to Hobby**

### 7. Pronto!
O Railway vai detectar o `railway.json` automaticamente e iniciar o bot com `node index.js`.

## Status do bot
O bot vai aparecer como **Transmitindo XDVZ Applications** no Discord automaticamente.
