const mariadb = require('mariadb');

// Configuração da conexão com o banco de dados
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',        // Substitua com seu usuário do MariaDB
  password: 'C3poqap2p*741137a',   // Substitua com sua senha
  port: 3306,          // Substitua com sua porta se necessário
  connectionLimit: 10
});

async function createTable() {
  let conn;
  try {
    // Obtendo uma conexão do pool
    conn = await pool.getConnection();
    console.log("Conectado ao banco de dados");

    // Criação de uma tabela simples
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;
    await conn.query(createTableQuery);
    console.log("Tabela 'usuarios' criada com sucesso");

  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  } finally {
    // Fechando a conexão
    if (conn) {
      await conn.end();
      console.log("Conexão encerrada");
    }
  }
}

// Chama a função para criar a tabela
createTable();
