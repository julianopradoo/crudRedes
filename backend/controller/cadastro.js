const con = require('../database/dbConnection');

// Funções CRUD para cadastro
exports.createCadastro = async (cadastroData) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = `
            INSERT INTO usuarios (
                nome, idade, email
            ) VALUES (?, ?, ?)
        `;
        const values = [
            cadastroData.nome, cadastroData.idade, cadastroData.email
        ];
        const result = await conn.query(query, values);
        
        return { id: result.insertId, ...cadastroData };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.getAllCadastros = async () => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'SELECT * FROM usuarios';
        const rows = await conn.query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.getCadastroById = async (cadastroId) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const rows = await conn.query(query, [cadastroId]);
        if (rows.length === 0) {
            throw new Error('Cadastro não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.updateCadastroById = async (cadastroId, cadastroData) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = `
            UPDATE usuarios SET
                nome = ?, idade = ?, email = ?
        `;
        const values = [
            cadastroData.nome, cadastroData.idade, cadastroData.email
        ];
        const result = await conn.query(query, values);
        if (result.affectedRows === 0) {
            throw new Error('Cadastro não encontrado');
        }
        return { message: 'Cadastro atualizado com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.deleteCadastroById = async (cadastroId) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'DELETE FROM usuarios WHERE id = ?';
        const result = await conn.query(query, [cadastroId]);
        if (result.affectedRows === 0) {
            throw new Error('Cadastro não encontrado');
        }
        return { message: 'Cadastro excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};