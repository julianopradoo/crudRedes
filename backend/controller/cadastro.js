const con = require('../database/dbConnection');

// Função utilitária para obter a conexão e garantir o fechamento
async function getConnection() {
    let conn;
    try {
        conn = await con.getConnection();
        
        // Seleciona o banco de dados 'crud'
        await conn.query('USE crud');
        
        return conn;
    } catch (error) {
        throw new Error("Erro ao conectar ao banco de dados ou selecionar o banco: " + error.message);
    }
}

// Função para criar um novo cadastro
exports.createCadastro = async (cadastroData) => {
    let conn;
    try {
        conn = await getConnection();
        const query = `
            INSERT INTO usuarios (nome, idade, email)
            VALUES (?, ?, ?)
        `;
        const values = [cadastroData.nome, cadastroData.idade, cadastroData.email];
        const result = await conn.query(query, values);
        return { id: result.insertId, ...cadastroData };
    } catch (error) {
        throw new Error("Erro ao criar cadastro: " + error.message);
    } finally {
        if (conn) conn.end();
    }
};

// Função para obter todos os cadastros
exports.getAllCadastros = async () => {
    let conn;
    try {
        conn = await getConnection();
        const query = 'SELECT * FROM usuarios';
        const rows = await conn.query(query);
        return rows;
    } catch (error) {
        throw new Error("Erro ao obter cadastros: " + error.message);
    } finally {
        if (conn) conn.end();
    }
};

// Função para obter um cadastro específico pelo ID
exports.getCadastroById = async (cadastroId) => {
    let conn;
    try {
        conn = await getConnection();
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const rows = await conn.query(query, [cadastroId]);
        if (rows.length === 0) {
            throw new Error('Cadastro não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error("Erro ao obter cadastro: " + error.message);
    } finally {
        if (conn) conn.end();
    }
};

// Função para atualizar um cadastro pelo ID
exports.updateCadastroById = async (cadastroId, cadastroData) => {
    let conn;
    try {
        conn = await getConnection();

        // Verificar se o cadastro existe antes de tentar atualizar
        const existingCadastro = await exports.getCadastroById(cadastroId);
        if (!existingCadastro) {
            throw new Error('Cadastro não encontrado');
        }

        const query = `
            UPDATE usuarios SET nome = ?, idade = ?, email = ?
            WHERE id = ?
        `;
        const values = [
            cadastroData.nome, 
            cadastroData.idade, 
            cadastroData.email, 
            cadastroId
        ];
        const result = await conn.query(query, values);
        if (result.affectedRows === 0) {
            throw new Error('Erro ao atualizar o cadastro');
        }
        return { message: 'Cadastro atualizado com sucesso' };
    } catch (error) {
        throw new Error("Erro ao atualizar cadastro: " + error.message);
    } finally {
        if (conn) conn.end();
    }
};

// Função para excluir um cadastro pelo ID
exports.deleteCadastroById = async (cadastroId) => {
    let conn;
    try {
        conn = await getConnection();
        
        // Verificar se o cadastro existe antes de tentar excluir
        const existingCadastro = await exports.getCadastroById(cadastroId);
        if (!existingCadastro) {
            throw new Error('Cadastro não encontrado');
        }

        const query = 'DELETE FROM usuarios WHERE id = ?';
        const result = await conn.query(query, [cadastroId]);
        if (result.affectedRows === 0) {
            throw new Error('Erro ao excluir o cadastro');
        }
        return { message: 'Cadastro excluído com sucesso' };
    } catch (error) {
        throw new Error("Erro ao excluir cadastro: " + error.message);
    } finally {
        if (conn) conn.end();
    }
};
