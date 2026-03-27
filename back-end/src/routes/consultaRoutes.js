const express = require('express');
const router = express.Router();
const consultaController = require('../controller/consultaController');

router.post('/', consultaController.criar.bind(consultaController));

router.get('/', consultaController.buscarTodos.bind(consultaController));

router.get('/:id', consultaController.buscarPorId.bind(consultaController));

router.put('/:id', consultaController.atualizar.bind(consultaController));

router.delete('/:id', consultaController.deletar.bind(consultaController));

module.exports = router;
