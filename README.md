# 🎮 Game List - Desafio 02 Compass UOL

Aplicação **fullstack** desenvolvida para o **Desafio 02 da Compass UOL**, que permite autenticação de usuários e gerenciamento de uma lista de jogos, incluindo categorias e plataformas.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend
- React
- TypeScript
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

# Inicie os containers com o Doker
# Certifique-se de que o Docker está instalado e em execução na sua máquina.
# No terminal, vá para a pasta game-list-api
doker-compose up -d

# Configure o arquivo .env com suas variáveis (como URL do banco)
# Execute as migrations
npx prisma migrate dev

# Inicie o servidor backend
npm run start:dev
```
### 💻 Frontend
```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run start

```


```
| Project  | Description                               | Link                                                      |
| -------- | ---------------------------------------- | ---------------------------------------------              |
| Backend  | API REST com Express, Prisma, Swagger    | [📄 game-list-api/README.md](./game-list-api/README.md)   |
| Frontend | Interface React com React Query & Styled | [📄 frontend/README.md](./frontend/README.md)             |


```
