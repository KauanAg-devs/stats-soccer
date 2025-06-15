

````markdown
# ⚽ Stats Soccer

![Preview](https://github.com/KauanAg-devs/stats-soccer/blob/main/.github/images/project-result.png?raw=true)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Laravel](https://img.shields.io/badge/Backend-Laravel-red)](https://laravel.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-000?logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20With-Tailwind-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/tests-PHPUnit-green?logo=laravel)](https://phpunit.de/)

> Projeto fullstack para criação e participação em quizzes de futebol.  
> Crie desafios temáticos, filtre por ano e jogue para testar seus conhecimentos! 🎯

---

## 📸 Demonstração

> *(Adicione aqui um GIF ou vídeo do funcionamento)*

---

## 🧱 Tecnologias Utilizadas

| Camada    | Tecnologias                           |
|-----------|----------------------------------------|
| Backend   | Laravel 11, MySQL, SQLite (testes), PHPUnit |
| Frontend  | Next.js 14, Tailwind CSS, React Hooks |
| Testes    | php artisan test / PHPUnit            |

---

## 🚀 Como rodar o projeto

### 📦 Backend (Laravel)

```bash
# Clone o projeto
git clone https://github.com/KauanAg-devs/stats-soccer.git
cd stats-soccer/stats-soccer-server

# Instale as dependências
composer install

# Copie o .env e gere a chave
cp .env.example .env
php artisan key:generate

# Rode as migrations
php artisan migrate

# Inicie o servidor
php artisan serve
````

### 🧪 Testes do backend

```bash
php artisan test
```

---

### 🌐 Frontend (Next.js)

```bash
# Acesse o diretório do frontend
cd ../stats-soccer-frontend

# Instale as dependências
npm install

# Configure o ambiente
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Rode o servidor
npm run dev
```

---

## ✅ Funcionalidades

* ✅ Cadastro de quizzes com múltiplas perguntas
* ✅ Visualização de quizzes por ano
* ✅ Interface interativa para jogar quizzes
* ✅ Feedback imediato sobre respostas
* ✅ Testes automatizados no backend

---

## 📁 Estrutura do Projeto

```
stats-soccer/
├── stats-soccer-server/   ← API Laravel
│   ├── app/
│   ├── database/
│   └── tests/Feature/QuizApiTest.php
└── stats-soccer-frontend/   ← Frontend Next.js
    ├── app/
    └── components/
```

---

## 🧠 Possíveis melhorias futuras

* 🔒 Autenticação JWT
* 🧾 Histórico de respostas e ranking
* 🎨 Upload de imagem personalizada por quiz

---

## 📄 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE) para mais informações.

---

Feito com 💻 + ⚽ + ☕ por [@KauanAg-devs](https://github.com/KauanAg-devs)

```
