const express = require('express')
const router = express.Router()
const PacienteController = require('../controller/PacienteController')


router.post('/', PacienteController.criar.bind(PacienteController))


router.get('/', PacienteController.buscarTodos.bind(PacienteController))


router.get('/:id', PacienteController.buscarPorId.bind(PacienteController))


router.put('/:id', PacienteController.atualizar.bind(PacienteController))


router.delete('/:id', PacienteController.deletar.bind(PacienteController))

module.exports = router
