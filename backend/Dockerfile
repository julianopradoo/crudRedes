# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Configurando o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos package.json e package-lock.json para dentro do container
COPY ./backend/package*.json ./


# Instalando as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o container
COPY . .

# Expondo a porta em que o servidor backend estará rodando
EXPOSE 3000

# Configurando a variável de ambiente para rodar o servidor
CMD ["npm", "start"]
