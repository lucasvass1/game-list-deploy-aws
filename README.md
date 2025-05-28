# 🎮 Game List - Desafio 02 Compass UOL

Aplicação **fullstack** desenvolvida para o **Desafio 02 da Compass UOL**, que permite autenticação de usuários e gerenciamento de uma lista de jogos, incluindo categorias e plataformas.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend
- React
- TypeScript
- Vite
- TanStack Query (React Query)
- Axios
- React Router DOM
- React Toastify

### 🔹 Backend
- Node.js
- TypeScript
- Express
- Prisma (ORM)
- PostgreSQL

---

## ✅ Funcionalidades

- Autenticação de usuários (Clerk ou pública)
- Listagem de jogos cadastrados
- Cadastro, edição e exclusão de jogos
- Filtros por categoria e plataforma

---

## 💻 Como Rodar o Projeto

### 🔧 Backend

```bash
# Clone o repositório
git clone https://github.com/OtavioAL/AWS_FS_ABR25_D02_COMPASS_GAME_LIST.git

# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure o arquivo .env com suas variáveis (como URL do banco)
# Execute as migrations
npx prisma migrate dev

# Inicie o servidor backend
npm run dev
```
### 💻 Frontend
```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev


