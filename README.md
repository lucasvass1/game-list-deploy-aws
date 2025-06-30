# 🚀 AWS_FS_ABR25_D03_COMPASS_Desafio3

## 📌 Descrição

Aplicação fullstack desenvolvida como parte do **Desafio 03** da Formação Compass UOL | Trilha Fullstack — Abril/2025.

A aplicação inclui:

- Backend em **Node.js** com **Prisma ORM** e **PostgreSQL**
- Frontend em **React**
- Deploy completo em uma instância **AWS EC2**, com containers orquestrados via **Docker Compose**
- Servidor **Nginx** configurado como proxy reverso e servidor estático

---

## 🗂️ Estrutura do Projeto

```
.
├── game-list-api/        # Backend (Node.js + Prisma)
├── frontend/             # Frontend (React)
├── nginx/                # Configuração do Nginx
├── docker-compose.yml    # Orquestração dos containers
└── README.md
```

---

## ⚙️ Tecnologias Utilizadas

- Node.js + TypeScript
- Express
- React
- PostgreSQL
- Prisma ORM
- Docker + Docker Compose
- Nginx
- AWS EC2

---

## 🧪 Como Rodar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/lucasvass1/AWS_FS_ABR25_D03_COMPASS_Desafio3.git
cd AWS_FS_ABR25_D03_COMPASS_Desafio3
```

2. Suba os containers com:

```bash
docker compose up -d --build
```

3. Acesse a aplicação em:

```
http://localhost
```

---

## ☁️ Deploy na AWS EC2

1. Clone o projeto na instância EC2:

```bash
git clone https://github.com/lucasvass1/AWS_FS_ABR25_D03_COMPASS_Desafio3.git
cd AWS_FS_ABR25_D03_COMPASS_Desafio3
```

2. Inicie os containers:

```bash
docker compose up -d --build
```

3. Certifique-se de liberar a porta **80** no **Grupo de Segurança** da sua instância EC2.

4. Acesse pelo IP público:

🔗(http://98.84.53.78)

---

## 🔐 Variáveis de Ambiente

As variáveis do backend estão definidas no arquivo:

```
game-list-api/.env
```

Exemplo de conteúdo:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=game-list
PORT=3333
```

---

## 🛠️ Comandos Úteis

- Ver logs dos containers:
```bash
docker compose logs -f
```

- Parar todos os containers:
```bash
docker compose down
```

- Rebuildar as imagens:
```bash
docker compose build
```

---

## ✅ Link do Projeto em Produção

🔗 [http://98.84.53.78](http://98.84.53.78)

---

## 🧾 Considerações Finais

Este projeto foi desenvolvido como entrega do **Desafio 03** no estágio da Compass UOL — Abril/2025.  
O foco principal foi aplicar conceitos de containerização, deploy na nuvem, orquestração com Docker Compose e configuração de ambientes em produção.
