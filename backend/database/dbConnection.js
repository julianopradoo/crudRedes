require('dotenv').config();
const mariadb = require('mariadb');

// Configuração do pool de conexões com MariaDB
const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost', // Pode ser configurado no arquivo .env
    user: process.env.DB_USER || 'root',     // Substitua conforme necessário
    password: process.env.DB_PASSWORD || 'fatec', // Substitua conforme necessário
    port: process.env.DB_PORT || 3306,       // Porta do MariaDB (padrão: 3306)
    connectionLimit: 100                    // Número máximo de conexões simultâneas
});

pool.on('error', (err) => {
    console.error('Erro no pool de conexões:', err);
  });
// Exporta o pool de conexões para ser usado em outros arquivos
module.exports = pool;

