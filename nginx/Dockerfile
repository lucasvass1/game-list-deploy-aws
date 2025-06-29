FROM nginx:1.15.0

# Remove todas as configs do diretório de conf.d
RUN rm -f /etc/nginx/conf.d/*

# Copia seu nginx.conf como default.conf (é o nome que o nginx carrega automaticamente)
COPY nginx.conf /etc/nginx/conf.d/default.conf
