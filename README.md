# MK-Financeiro

![capa](cover.svg)

Assistente financeiro pessoal com chat: escreva “gastei 150 no mercado” e ele anota, categoriza e mostra seus números. Abre pelo link no celular e no PC, tudo gratuito.

**Peças:** site no GitHub Pages · dados e login no Supabase · IA (Gemini) chamada por um Worker da Cloudflare que esconde a chave. Frases simples são entendidas por regras, sem gastar IA.

> Anote enquanto faz: você vai juntar 5 informações. **Não mande chaves para ninguém.**
> 1. Project URL do Supabase · 2. chave anon do Supabase · 3. chave do Gemini · 4. URL do Worker · 5. seu usuário do GitHub

---

## Passo 1 · Supabase (banco e login)

1. Crie conta em supabase.com → **New project**. Anote a senha do banco.
2. Menu **SQL Editor** → **New query** → cole todo o `supabase.sql` → **Run**. Deve aparecer “Success”.
3. **Authentication → Users → Add user → Create new user**: seu e-mail, uma senha forte e marque **Auto Confirm User**.
4. **Authentication → Sign In / Providers**: desligue **Allow new users to sign up** e salve. Assim só você entra.
5. **Project Settings → API**: copie o **Project URL** e a chave **anon public**.

## Passo 2 · Chave do Gemini

1. aistudio.google.com/apikey → **Create API key** → copie.
2. Confira no AI Studio um modelo **Flash-Lite ou Flash com plano gratuito**. O padrão do projeto é `gemini-2.5-flash-lite`. Se não existir mais, anote o nome certo.

## Passo 3 · Cloudflare Worker (a IA)

1. Crie conta em cloudflare.com e entre no painel.
2. Menu da esquerda: **Compute → Workers & Pages** (em versões antigas, só “Workers & Pages”).
3. **Create application** (ou **Create**) → **Start with Hello World!**.
4. Nome: `mk-financeiro-ia` → **Deploy** → **Continue to project**.
5. Clique no ícone **Edit code** (topo). No editor, **Ctrl+A, Delete**, cole todo o `worker.js` e clique **Deploy**.
6. Volte à página do Worker → aba **Settings → Variables and Secrets → Add**. Crie uma por vez, clicando em **Deploy** depois de cada uma:

| Nome | Tipo | Valor |
|---|---|---|
| `GEMINI_KEY` | Secret | chave do Gemini |
| `SUPABASE_URL` | Text | Project URL |
| `SUPABASE_KEY` | Text | chave anon |
| `ALLOWED_ORIGIN` | Text | `https://SEU-USUARIO.github.io` |
| `MODEL` (opcional) | Text | nome do modelo do passo 2 |

   `ALLOWED_ORIGIN` é só o endereço base: **sem barra no final e sem /MK-Financeiro**.
7. Copie a URL do Worker (`https://mk-financeiro-ia.SEU-SUBDOMINIO.workers.dev`).
8. **Teste:** abra essa URL no navegador. Aparecer `forbidden` é **bom**: significa que o Worker está vivo e protegido.

## Passo 4 · Preencher o `config.js`

Abra o arquivo no Bloco de Notas e troque os três textos `COLE_AQUI...` (mantenha as aspas):

```js
SUPABASE_URL: "https://xxxx.supabase.co",
SUPABASE_KEY: "eyJ...sua chave anon...",
WORKER_URL: "https://mk-financeiro-ia.SEU-SUBDOMINIO.workers.dev",
```

Esses três podem ficar públicos. A chave do Gemini **nunca** vai neste arquivo.

## Passo 5 · GitHub

1. github.com → **New repository**. Nome: **MK-Financeiro**. Marque **Public**. **Create repository**.
2. **uploading an existing file**. Arraste `index.html`, `app.js`, `config.js` e `cover.svg` (pode incluir `worker.js`, `supabase.sql` e este README). **Commit changes**.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch** → branch `main`, pasta `/ (root)` → **Save**.
4. Em 1 a 2 minutos: `https://SEU-USUARIO.github.io/MK-Financeiro`.
5. **About** (engrenagem na página do repositório), descrição sugerida: *💰 Assistente financeiro pessoal com chat: anote gastos escrevendo “gastei 150 no mercado”. Painel por categoria, fatura do cartão e tempo de reserva. HTML/JS + Supabase + Gemini, 100% gratuito.*

## Passo 6 · Usar

Abra o link, entre com o e-mail e a senha do passo 1. No celular: menu do navegador → **Adicionar à tela inicial**.

**Teste rápido:** escreva `gastei 50 no mercado` (sem IA) e depois `quanto gastei hoje?` (usa a IA).

---

## Se algo der errado

| Sintoma | O que fazer |
|---|---|
| Aparece “Falta preencher o config.js” | Um dos `COLE_AQUI` ficou no arquivo. Edite no GitHub (ícone do lápis) e salve. |
| Login diz e-mail ou senha incorretos | Confirme o usuário em Authentication → Users e se marcou Auto Confirm. |
| Lançamento não salva | Rode de novo o `supabase.sql`; confira URL e chave anon no `config.js`. |
| “A IA não respondeu” | Confira `ALLOWED_ORIGIN`, o nome do `MODEL`, se `GEMINI_KEY` é Secret, e se o limite gratuito do dia acabou. Frases simples seguem funcionando. |
| Página em branco | Aperte F12, aba **Console**, copie o erro vermelho. |
| Supabase pausado | No plano gratuito pausa após cerca de uma semana sem uso. Clique em restaurar no painel. |

## Segurança e privacidade

- Os lançamentos ficam só no Supabase, protegidos por login e por regra de linha (RLS).
- No plano gratuito do Gemini, o Google pode usar o conteúdo enviado para melhorar produtos. O app manda só valores, categorias e descrições curtas. **Não escreva CPF, senhas ou números de cartão.**
- Nunca coloque a chave do Gemini em nenhum arquivo do repositório.
