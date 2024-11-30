# Use a versão leve do Node.js baseada em Alpine
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie apenas os arquivos necessários para instalar as dependências
COPY package*.json ./

# Instale as dependências com otimizações
RUN npm install --production

# Copie o restante dos arquivos do projeto para o container
COPY . .

# Exponha a porta 3000 para o servidor Node.js
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["node", "index.js"]
