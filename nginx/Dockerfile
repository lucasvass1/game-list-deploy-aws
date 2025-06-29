FROM nginx:1.15.0

# Remove a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia a nova configuração da máquina local para dentro da imagem
COPY nginx.conf /etc/nginx/conf.d/
