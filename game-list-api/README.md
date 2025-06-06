# 🎮 Game List API

A RESTful API built with Node.js, Express, TypeScript, Prisma ORM. It supports full CRUD operations for managing games, categories, and platforms. Includes authentication with JWT and Basic Auth and API documentation via Swagger.

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM** (with PostgreSQL)
- **JWT** + **Basic Auth** (authentication)
- **Docker** + **Docker Compose**
- **Swagger** (API docs)
- **Vitest** (testing)
- **Bcrypt** — password encryption
- **ESLint + Prettier** — code standardization and formatting
- **Arquitetura Limpa (Clean Architecture)**

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/OtavioAL/AWS_FS_ABR25_D02_COMPASS_GAME_LIST.git
cd game-list-api
```

### 🐳 Run with Docker

```bash
docker-compose up -d
```

This will spin up the Node.js application and the database in containers.

---

## 🛠️ Development

### Install dependencies

```bash
npm install
```

### Start in development mode

```bash
npm run start:dev
```

or (alternative)

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm start
```

---

## 🧪 Running Tests

- Unit and integration tests are written using **Vitest**.

```bash
npm run test
```

---

## ⚙️ Prisma

### Generate Prisma client

```bash
npm run generate
```

### Run database migrations

```bash
npm run migrate
```

---

## 📘 API Documentation

After the application is running, access the Swagger docs at:

```
http://localhost:3333/docs
```

---

## 📂 Project Structure

```
src/
├── @types/
├── config/
├── domain
│   ├── entities/
│   ├── errors/
│   ├── repositories/
│   ├── use-cases/
├── infra/
│   ├── database
│   │    ├──  prisma/
│   ├──http/
│       ├── controllers
│   │   ├── docs/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── server.ts
├── shared/
├── utils/
├── main.ts
├── docs/ (Swagger)
├── tests/
```

---

## 🔐 Authentication

Authentication is handled via **JWT** tokens. Protected routes require a `Bearer` token in the `Authorization` header.

---

## 📄 Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/gamelist
JWT_SECRET=your_jwt_secret
PORT=3333
```

---

## 🧹 Code Quality

- Formatted with **Prettier**
- Linted with **ESLint**

```bash
npm run format
```
