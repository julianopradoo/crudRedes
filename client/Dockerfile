# Usando a imagem oficial do Nginx
FROM nginx:alpine

# Copiar os arquivos de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar os arquivos estáticos da aplicação para o diretório de serviço do Nginx
COPY ./index.html /usr/share/nginx/html
COPY ./script.js /usr/share/nginx/html
COPY ./style.css /usr/share/nginx/html

# Expondo a porta padrão do Nginx
EXPOSE 80
