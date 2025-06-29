# Estágio de construção
FROM node:18 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de produção
FROM node:18

WORKDIR /var/www/html

# Copia apenas o build final
COPY --from=builder /app/build .

# Instala o servidor de arquivos estáticos
RUN npm install -g serve

VOLUME ["/var/www/html"]

EXPOSE 3000

# Inicia o servidor
CMD ["serve", "-s", ".", "-l", "3000"]
