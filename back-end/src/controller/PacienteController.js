const PacienteService = require('../service/PacienteService')
const { toResponse, toListResponse } = require('../dto/PacienteDTO')

class PacienteController {
  
  async criar(req, res) {
  try {
    
    const { nome, cpf, dataNascimento, plano } = req.body

    console.log('Criando novo paciente...')

    
    const paciente = await PacienteService.criar({
      nome,
      cpf,
      dataNascimento,
      plano,
    })

    
    return res.status(201).json({
      sucesso: true,
      mensagem: 'Paciente criado com sucesso',
      dados: toResponse(paciente), // 👈 AQUI FOI A TROCA
    })
  } catch (erro) {
    console.error('Erro ao criar paciente:', erro.message)

    
    return res.status(erro.status || 400).json({
      sucesso: false,
      mensagem: erro.message,
      detalhes: erro.detalhes || null,
    })
  }
}

  async buscarTodos(req, res) {
    try {
      
      const { pagina = 1, limite = 10 } = req.query

      console.log(`Buscando pacientes... (página ${pagina}, limite ${limite})`)

      
      const resultado = await PacienteService.buscarTodos(pagina, limite)

    
      return res.status(200).json({
        sucesso: true,
        mensagem: 'Pacientes encontrados',
        dados: resultado,
      })
    } catch (erro) {
      console.error('Erro ao buscar pacientes:', erro.message)

      return res.status(erro.status || 500).json({
        sucesso: false,
        mensagem: erro.message,
      })
    }
  }


  async buscarPorId(req, res) {
    try {
      
      const { id } = req.params

      console.log(`Buscando paciente com ID ${id}...`)

      
      const paciente = await PacienteService.buscarPorId(id)

      
      return res.status(200).json({
        sucesso: true,
        mensagem: 'Paciente encontrado',
        dados: paciente,
      })
    } catch (erro) {
      console.error('Erro ao buscar paciente:', erro.message)

      return res.status(erro.status || 500).json({
        sucesso: false,
        mensagem: erro.message,
      })
    }
  }


  async atualizar(req, res) {
    try {
      const { id } = req.params
      const dados = req.body

      console.log(`Atualizando paciente com ID ${id}...`)

      
      const paciente = await PacienteService.atualizar(id, dados)

      
      return res.status(200).json({
        sucesso: true,
        mensagem: 'Paciente atualizado com sucesso',
        dados: paciente,
      })
    } catch (erro) {
      console.error('Erro ao atualizar paciente:', erro.message)

      return res.status(erro.status || 400).json({
        sucesso: false,
        mensagem: erro.message,
        detalhes: erro.detalhes || null,
      })
    }
  }


  async deletar(req, res) {
    try {
      const { id } = req.params

      console.log(`Deletando paciente com ID ${id}...`)

      
      const paciente = await PacienteService.deletar(id)


      return res.status(200).json({
        sucesso: true,
        mensagem: 'Paciente deletado com sucesso',
        dados: paciente,
      })
    } catch (erro) {
      console.error('Erro ao deletar paciente:', erro.message)

      return res.status(erro.status || 500).json({
        sucesso: false,
        mensagem: erro.message,
      })
    }
  }
}

module.exports = new PacienteController()
