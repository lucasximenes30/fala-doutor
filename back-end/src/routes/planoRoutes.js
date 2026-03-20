const express = require('express');
const router = express.Router();
const planoController = require('../controller/planoController');

router.post('/', planoController.criar.bind(planoController))

router.get('/', planoController.buscarTodos.bind(planoController))

router.get('/:id', planoController.buscarPorId.bind(planoController))

router.put('/:id', planoController.atualizar.bind(planoController))

router.delete('/:id', planoController.deletar.bind(planoController))

module.exports = router