const express = require('express');
const router = express.Router();
const cadastroController = require('../controller/cadastro');

// Definição das rotas para cadastro
router.post('/', async (req, res) => {
    try {
        const newCadastro = await cadastroController.createCadastro(req.body);
        res.status(201).json(newCadastro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const cadastros = await cadastroController.getAllCadastros();
        res.json(cadastros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cadastro = await cadastroController.getCadastroById(req.params.id);
        res.json(cadastro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCadastro = await cadastroController.updateCadastroById(req.params.id, req.body);
        res.json(updatedCadastro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await cadastroController.deleteCadastroById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
