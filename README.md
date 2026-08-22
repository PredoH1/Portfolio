# 💼 Portfólio Profissional - Pedro Henrique

Portfólio pessoal com painel administrativo próprio: todo o conteúdo
(projetos, experiências, atividades, tech skills, certificados e links
sociais) é editável sem tocar em código, através de uma rota de admin
protegida por login — visitantes só têm acesso de leitura.

## 🛠️ Stack

- React 19 + Vite 6, React Router DOM 7
- CSS Modules (tokens de design em `src/styles/tokens.css`)
- Firebase Firestore (conteúdo) + Firebase Authentication (login do admin)
- Cloudinary (upload de imagens/PDFs do painel)
- EmailJS (formulário de contato) · GSAP e Swiper (animações/carrossel)
- Hospedagem: Netlify

## 🔐 Painel administrativo

Acesse `/painel-x7k9/login` com o email/senha cadastrados no Firebase
Authentication. Não existe cadastro público — o usuário admin é criado
manualmente no console do Firebase. Todo o conteúdo público é editado pelas
5 seções do painel (Projetos, Experiências, Atividades, Resumo/Certificados,
Perfil/Links).

## ⚙️ Configuração do ambiente

1. Copie `.env.example` para `.env` e preencha:
   - `VITE_FIREBASE_*`: credenciais do app web do seu projeto Firebase
     (Firestore + Authentication ativados, plano Spark/gratuito).
   - `VITE_CLOUDINARY_*`: cloud name e nome do upload preset "unsigned"
     criado no Cloudinary (plano gratuito).
   - `VITE_EMAILJS_*`: credenciais do seu serviço no EmailJS.
2. Publique as regras de segurança do Firestore (necessário
   [Firebase CLI](https://firebase.google.com/docs/cli) + `firebase login`):
   ```
   firebase deploy --only firestore:rules
   ```
3. (Opcional, uma única vez) Popule o Firestore com o conteúdo inicial e
   suba as imagens/arquivos atuais para o Cloudinary — veja as instruções no
   topo de `scripts/seed-firestore.mjs` (precisa de uma chave de conta de
   serviço do Firebase Admin).

## 🚀 Rodando localmente

```
npm install
npm run dev
```

## 📦 Deploy

O projeto está configurado para Netlify (`netlify.toml` + `public/_headers`).
Conecte o repositório, defina as mesmas variáveis de ambiente do `.env` nas
configurações do site e publique.

## 🔒 Segurança

- Leitura pública / escrita restrita a um único email admin, aplicada nas
  regras do Firestore (`firestore.rules`) — a barreira real contra escrita
  não autorizada, independente do que roda no navegador.
- Nenhuma senha, chave de API secreta ou credencial fica no código-fonte.
- Cabeçalhos de segurança (CSP, X-Frame-Options, etc.) configurados via
  `public/_headers` no Netlify.
- Rode `npm audit` periodicamente para checar dependências vulneráveis.

## 📫 Contato

- 📧 **Email:** pedroh200candido@gmail.com
- 💼 **LinkedIn:** [linkedin.com/in/pedrohsouzacandido](https://www.linkedin.com/in/pedrohsouzacandido/)
