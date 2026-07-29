FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 🧠 Gera o Prisma Client (ESSENCIAL!)
RUN npx prisma generate

# 🔨 Compila o TypeScript (como já está)
RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
