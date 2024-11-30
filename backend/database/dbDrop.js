const pool = require('./dbConnection'); // Importa a conexão configurada

async function deleteDatabase() {
  let conn;
  try {
    conn = await pool.getConnection(); // Obtém uma conexão do pool
    console.log("Conectado");

    const sql = "DROP DATABASE crud";
    await conn.query(sql); // Executa o comando para deletar o banco
    console.log("Database 'crud' deletada com sucesso");

  } catch (err) {
    console.error("Erro durante a operação:", err);
  } finally {
    if (conn) {
      try {
        await conn.end(); // Encerra a conexão
        console.log("Conexão encerrada");
      } catch (endErr) {
        console.error("Erro ao encerrar a conexão:", endErr);
      }
    }
  }
}

// Executa a função e finaliza o processo
deleteDatabase()
  .then(() => process.exit())
  .catch(err => {
    console.error("Erro na execução do script:", err);
    process.exit(1);
  });
