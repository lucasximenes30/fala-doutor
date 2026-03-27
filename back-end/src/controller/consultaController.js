const consultaService = require('../service/consultaService')
const { toResponse, toListResponse } = require('../dto/consultaDTO')

class ConsultaController {

  async criar(req, res) {
    try {
      const {
        data,
        medico,
        paciente,
      } = req.body

      const consulta = await consultaService.criar({
        data,
        medico,
        paciente,
      })

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Consulta criada com sucesso',
        dados: toResponse(consulta),
      })

    } catch (erro) {
      console.error('Erro ao criar consulta:', erro.message)

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

      const resultado = await consultaService.buscarTodos(pagina, limite)

      return res.status(200).json({
        sucesso: true,
        mensagem: 'Consultas encontradas',
        dados: {
          ...resultado,
          consultas: toListResponse(resultado.consultas)
        },
      })

    } catch (erro) {
      console.error('Erro ao buscar consultas:', erro.message)

      return res.status(erro.status || 500).json({
        sucesso: false,
        mensagem: erro.message,
      })
    }
  }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params

            const consulta = await consultaService.buscarPorId(id)

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Consulta encontrada',
                dados: toResponse(consulta),
            })
        
        } catch (erro) {
            console.error('Erro ao buscar consulta:', erro.message)

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

            const consulta = await consultaService.atualizar(id, dados)
            
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Consulta atualizada com sucesso',
                dados: toResponse(consulta),
            })
        } catch (erro) {
            console.error('Erro ao atualizar consulta:', erro.message)

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

            await consultaService.deletar(id)

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Consulta deletada com sucesso',
            })
        }catch (erro) {
            console.error('Erro ao deletar consulta:', erro.message)

            return res.status(erro.status || 400).json({
                sucesso: false,
                mensagem: erro.message,
                detalhes: erro.detalhes || null,
            })
        }
    }
}

module.exports = new ConsultaController()
