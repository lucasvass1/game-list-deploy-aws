FROM nginx:1.15.0

# Remove a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia o novo arquivo de configuração do nginx (que você criou)
COPY nginx.conf /etc/nginx/conf.d/default.conf
