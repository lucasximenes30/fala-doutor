const express = require('express')
const router = express.Router()
const pacienteController = require('../controller/pacienteController')


router.post('/', pacienteController.criar.bind(pacienteController))


router.get('/', pacienteController.buscarTodos.bind(pacienteController))


router.get('/:id', pacienteController.buscarPorId.bind(pacienteController))


router.put('/:id', pacienteController.atualizar.bind(pacienteController))


router.delete('/:id', pacienteController.deletar.bind(pacienteController))

module.exports = router
