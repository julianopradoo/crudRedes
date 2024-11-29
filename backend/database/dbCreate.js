const con = require('./dbConnection');
const createTableQueries = require('./dbDefault');
const initialInserts = require('./dbInsert');

// Verifica se o log está ativado pela variável de ambiente
const isLogEnabled = process.env.LOG === 'true';

// Função auxiliar para logar dados com console.table
function logTable(message, data) {
  if (isLogEnabled) {
    console.log(message);
    console.table(data);
  }
}

async function initializeDatabase() {
  let conn;
  console.log('Conectando ao banco de dados...');
  try {
    // Obtém a conexão do pool
    conn = await con.getConnection();
    
    if (isLogEnabled) console.log("Conectado ao banco de dados");

    // Cria o banco de dados e escolhe o banco a ser usado
    await conn.query("DROP DATABASE IF EXISTS crud");  // Deleta o banco de dados se existir
    await conn.query("CREATE DATABASE IF NOT EXISTS crud"); // Cria o banco se não existir
    await conn.query("USE crud");  // Seleciona o banco de dados

    // Verificar se há tabelas no banco de dados
    const rows = await conn.query("SHOW TABLES");
    const tables = rows.map(row => Object.values(row)[0]);
    logTable("Tabelas existentes no banco de dados:", rows);

    if (tables.length === 0) {
      // Criar tabelas conforme o padrão
      for (const table in createTableQueries) {
        if (createTableQueries.hasOwnProperty(table)) {
          await conn.query(createTableQueries[table]);
          if (isLogEnabled) console.log(`Tabela ${table} criada com sucesso`);
        }
      }

      if (isLogEnabled) console.log("Estrutura padrão do banco de dados criada");

      // Popular banco com inserts iniciais
      for (const table in initialInserts) {
        if (initialInserts.hasOwnProperty(table)) {
          await conn.query(initialInserts[table]);
          if (isLogEnabled) console.log(`Insert na tabela ${table} criado com sucesso`);
        }
      }
    } else {
      if (isLogEnabled) console.log("O banco de dados 'crud' já possui tabelas");
    }
  } catch (err) {
    console.error("Erro ao inicializar o banco de dados:", err);
  } finally {
    // Fecha a conexão com o banco
    if (conn) {
      try {
        await conn.end();
        if (isLogEnabled) console.log("Conexão encerrada");
      } catch (err) {
        console.error("Erro ao encerrar a conexão:", err);
      }
    }
  }
}

// Exporta a função para inicializar o banco de dados
module.exports = initializeDatabase;
