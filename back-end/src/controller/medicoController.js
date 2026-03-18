const medicoService = require('../service/medicoService')
const { toResponse, toListResponse } = require('../dto/medicoDTO')

class MedicoController {

  async criar(req, res) {
    try {
      const {
        nome,
        cpf,
        crm,
        dataNascimento,
        plano
      } = req.body

      const medico = await medicoService.criar({
        nome,
        cpf,
        crm,
        dataNascimento,
        plano
      })

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Médico criado com sucesso',
        dados: toResponse(medico),
      })

    } catch (erro) {
      console.error('Erro ao criar médico:', erro.message)

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

      const resultado = await medicoService.buscarTodos(pagina, limite)

      return res.status(200).json({
        sucesso: true,
        mensagem: 'Médicos encontrados',
        dados: {
          ...resultado,
          medicos: toListResponse(resultado.medicos)
        },
      })

    } catch (erro) {
      console.error('Erro ao buscar médicos:', erro.message)

      return res.status(erro.status || 500).json({
        sucesso: false,
        mensagem: erro.message,
      })
    }
  }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params

            const medico = await medicoService.buscarPorId(id)

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Médico encontrado',
                dados: toResponse(medico),
            })
        
        } catch (erro) {
            console.error('Erro ao buscar médico:', erro.message)

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

            const medico = await medicoService.atualizar(id, dados)
            
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Médico atualizado com sucesso',
                dados: toResponse(medico),
            })
        } catch (erro) {
            console.error('Erro ao atualizar médico:', erro.message)

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

            await medicoService.deletar(id)

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Médico deletado com sucesso',
            })
        }catch (erro) {
            console.error('Erro ao deletar médico:', erro.message)

            return res.status(erro.status || 400).json({
                sucesso: false,
                mensagem: erro.message,
                detalhes: erro.detalhes || null,
            })
        }
    }
}

module.exports = new MedicoController()