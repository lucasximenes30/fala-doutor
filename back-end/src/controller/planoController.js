const planoService = require('../service/planoService');
const { toResponse, toListResponse } = require('../dto/planoDTO');

class PlanoController {
    async criar(req, res) {
        try {
            const {
                nome,
                valor
            } = req.body;

            const plano = await planoService.criar({
                nome,
                valor
            })
            return res.status(201).json({
                sucesso: true,
                mensagem: 'Plano criado com sucesso',
                dados: toResponse(plano),
            })
        } catch (erro) {
            console.error('Erro ao criar plano:', erro.message)

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

            const resultado = await planoService.buscarTodos(pagina, limite)

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Planos encontrados',
                dados: {
                    ...resultado,
                    planos: toListResponse(resultado.planos)
                },
            })
        } catch (erro) {
            console.error('Erro ao buscar planos:', erro.message)

            return res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.message,
            })
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params

            const plano = await planoService.buscarPorId(id)
            
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Plano encontrado',
                dados: toResponse(plano),
            })
        } catch (erro) {
            console.error('Erro ao buscar plano por ID:', erro.message)

            return res.status(erro.status || 404).json({
                sucesso: false,
                mensagem: erro.message,
            })
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const dados = req.body

            const plano = await planoService.atualizar(id, dados)

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Plano atualizado com sucesso',
                dados: toResponse(plano),
            })
        } catch (erro) {
            console.error('Erro ao atualizar plano:', erro.message)

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

            await planoService.deletar(id)

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Plano deletado com sucesso!',
            })
        }catch (erro) {
            return res.status(erro.status || 500).json({
                    sucesso: false,
                    mensagem: erro.message,
                    detalhes: erro.detalhes || null,
            })
        }
    }
}
module.exports = new PlanoController()