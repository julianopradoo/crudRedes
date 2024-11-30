const express = require('express');
const router = express.Router();
const cadastroController = require('../controller/cadastro');

// Definição das rotas para cadastro

// Criação de cadastro
router.post('/', async (req, res) => {
    try {
        const newCadastro = await cadastroController.createCadastro(req.body);
        res.status(201).json(newCadastro); // Retorna o cadastro criado com o status 201
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter todos os cadastros
router.get('/', async (req, res) => {
    try {
        const cadastros = await cadastroController.getAllCadastros();
        res.json(cadastros); // Retorna todos os cadastros
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter cadastro por ID
router.get('/:id', async (req, res) => {
    try {
        const cadastro = await cadastroController.getCadastroById(req.params.id);
        if (!cadastro) {
            return res.status(404).json({ error: 'Cadastro não encontrado' });
        }
        res.json(cadastro); // Retorna o cadastro encontrado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar cadastro por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCadastro = await cadastroController.updateCadastroById(req.params.id, req.body);
        res.json(updatedCadastro); // Retorna a mensagem de sucesso da atualização
    } catch (error) {
        if (error.message.includes('Cadastro não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

// Excluir cadastro por ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await cadastroController.deleteCadastroById(req.params.id);
        res.json(result); // Retorna a mensagem de sucesso da exclusão
    } catch (error) {
        if (error.message.includes('Cadastro não encontrado')) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
