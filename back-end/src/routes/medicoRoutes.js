const express = require('express');
const router = express.Router();
const medicoController = require('../controller/medicoController');

router.post('/', medicoController.criar.bind(medicoController));

router.get('/', medicoController.buscarTodos.bind(medicoController));

router.get('/:id', medicoController.buscarPorId.bind(medicoController));

router.put('/:id', medicoController.atualizar.bind(medicoController));

router.delete('/:id', medicoController.deletar.bind(medicoController));

module.exports = router;