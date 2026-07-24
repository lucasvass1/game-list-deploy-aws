# 🎮 Game List

![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

Aplicação fullstack para organizar sua coleção de jogos: cadastre **jogos**, **categorias** e **plataformas**, acompanhe o status de cada jogo (jogando, concluído ou abandonado), marque favoritos e visualize estatísticas gerais em um painel inicial.

Desenvolvido como **Desafio 03** da Formação Compass UOL — Trilha Fullstack (Abril/2025).

---

## 📋 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Tecnologias utilizadas](#️-tecnologias-utilizadas)
- [Estrutura do projeto](#️-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar com Docker (recomendado)](#-como-rodar-com-docker-recomendado)
- [Como rodar em modo desenvolvimento](#-como-rodar-em-modo-desenvolvimento-sem-docker)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Documentação da API](#-documentação-da-api)
- [Comandos úteis](#️-comandos-úteis)
- [Deploy em produção](#️-deploy-em-produção)

---

## 📌 Sobre o projeto

O **Game List** é um gerenciador pessoal de biblioteca de jogos. Após criar uma conta e fazer login, o usuário pode:

- 🎮 Cadastrar, editar, visualizar e excluir **jogos**, com título, descrição, imagem, status, categoria, plataforma e datas de aquisição/conclusão;
- 🏷️ Organizar os jogos em **categorias** e **plataformas** próprias;
- ⭐ Marcar jogos como **favoritos**;
- 📊 Acompanhar, na tela inicial, um resumo com o total de jogos, categorias, plataformas e favoritos cadastrados;
- 🔎 Buscar, filtrar e ordenar os jogos cadastrados.

A autenticação é feita via **JWT**, com cada usuário enxergando apenas os dados que cadastrou.

---

## 🛠️ Tecnologias utilizadas

### Backend (`game-list-api`)

| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/) | Runtime e tipagem estática |
| [Express 5](https://expressjs.com/) | Framework HTTP / rotas |
| [Prisma ORM](https://www.prisma.io/) | Acesso e migrações do banco de dados |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados relacional |
| [JWT](https://jwt.io/) + [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Autenticação e hash de senhas |
| [Swagger (swagger-jsdoc / swagger-ui-express)](https://swagger.io/) | Documentação interativa da API |
| [Vitest](https://vitest.dev/) | Testes automatizados |

### Frontend (`frontend`)

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Interface do usuário |
| [React Router](https://reactrouter.com/) | Roteamento de páginas |
| [TanStack Query](https://tanstack.com/query) | Requisições e cache de dados assíncronos |
| [Axios](https://axios-http.com/) | Cliente HTTP |
| [styled-components](https://styled-components.com/) | Estilização |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Notificações (toasts) |

### Infraestrutura

| Tecnologia | Uso |
|---|---|
| [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) | Orquestração dos containers |
| [Nginx](https://nginx.org/) | Proxy reverso e servidor de arquivos estáticos |
| [AWS EC2](https://aws.amazon.com/ec2/) | Hospedagem em produção |

---

## 🗂️ Estrutura do projeto

```
.
├── game-list-api/        # Backend (Node.js + Express + Prisma)
│   ├── src/
│   │   ├── domain/       # Entidades, casos de uso e regras de negócio
│   │   └── infra/        # Rotas HTTP, middlewares, banco de dados e docs
│   └── prisma/           # Schema e migrações do banco
├── frontend/              # Frontend (React + TypeScript)
│   └── src/
│       ├── pages/         # Telas da aplicação (Home, Games, Categories, ...)
│       ├── components/    # Componentes reutilizáveis
│       ├── context/       # Contextos globais (auth, games, categories, ...)
│       └── services/      # Chamadas à API
├── nginx/                 # Configuração do proxy reverso
├── docker-compose.yml     # Orquestração dos containers
└── README.md
```

---

## ✅ Pré-requisitos

- [Docker](https://www.docker.com/get-started) e Docker Compose (para o caminho recomendado)
- [Node.js 18+](https://nodejs.org/) e npm (apenas se for rodar em modo desenvolvimento, sem Docker)

---

## 🚀 Como rodar com Docker (recomendado)

1. Clone o repositório:

```bash
git clone https://github.com/lucasvass1/AWS_FS_ABR25_D03_COMPASS_Desafio3.git
cd AWS_FS_ABR25_D03_COMPASS_Desafio3
```

2. Configure as variáveis de ambiente do backend (veja [Variáveis de ambiente](#-variáveis-de-ambiente)):

```bash
# game-list-api/.env
DATABASE_URL="postgresql://postgres:postgres@postgre-wallet:5432/game-list"
JWT_SECRET="troque-por-um-segredo-forte"
```

3. Gere o build de produção do frontend — o container do Nginx serve os arquivos estáticos gerados nesta pasta:

```bash
cd frontend
npm install
npm run build
cd ..
```

4. Suba os containers:

```bash
docker compose up -d --build
```

5. Acesse a aplicação em:

```
http://localhost
```

A API fica disponível separadamente em `http://localhost:3333` e o PostgreSQL exposto na porta `5432`.

> Ao subir, o container do backend executa `prisma db push` automaticamente, sincronizando o schema com o banco antes de iniciar o servidor.

---

## 💻 Como rodar em modo desenvolvimento (sem Docker)

**Banco de dados** — suba apenas o PostgreSQL via Docker:

```bash
docker compose up -d postgre-wallet
```

**Backend:**

```bash
cd game-list-api
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

A API sobe em `http://localhost:3333` e a documentação Swagger em `http://localhost:3333/docs`.

**Frontend:**

```bash
cd frontend
npm install
npm start
```

A interface sobe em `http://localhost:3000` e consome a API através do proxy configurado em `src/services/api.ts`.

---

## 🔐 Variáveis de ambiente

### `game-list-api/.env`

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | String de conexão do PostgreSQL | `postgresql://postgres:postgres@postgre-wallet:5432/game-list` |
| `JWT_SECRET` | Segredo usado para assinar e validar os tokens JWT | `um-segredo-forte-e-aleatorio` |
| `PORT` | Porta em que a API sobe (opcional) | `3333` |

> ⚠️ Se `JWT_SECRET` não for definida, a aplicação usa um valor padrão apenas para desenvolvimento — **defina sempre um valor próprio em produção**.

---

## 📚 Documentação da API

Com o backend em execução, a documentação interativa (Swagger) fica disponível em:

```
http://localhost:3333/docs
```

---

## 🛠️ Comandos úteis

```bash
# Ver logs de todos os containers
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f game-list-api

# Parar todos os containers
docker compose down

# Rebuildar as imagens
docker compose build

# Rodar os testes do backend
cd game-list-api && npm run test
```

---

## ☁️ Deploy em produção

O deploy é feito em uma instância **AWS EC2**, com os containers orquestrados via **Docker Compose**:

1. Clone o projeto na instância EC2 e configure o `game-list-api/.env` com os valores de produção;
2. Gere o build do frontend (`npm run build`) e suba os containers (`docker compose up -d --build`);
3. Libere a porta **80** no Grupo de Segurança da instância EC2 para acesso externo.
