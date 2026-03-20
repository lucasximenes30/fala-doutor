const planoRepository = require('../repository/planoRepository');
const { validarPlano } = require('../validators/planoValidator');
const { prisma } = require('../config/database');

class PlanoService {

    async criar(dados) {
        const validacao = validarPlano(dados);

        if (!validacao.valido) {
            const erro = new Error('Dados inválidos');
            erro.detalhes = validacao.erros;
            throw erro;
        }

        return await planoRepository.criar(dados);
    }

    async buscarTodos(pagina = 1, limite = 10) {
        pagina = Math.max(1, parseInt(pagina) || 1);
        limite = Math.max(1, Math.min(100, parseInt(limite) || 10));

        const skip = (pagina - 1) * limite;

        const planos = await planoRepository.buscarTodos({
            skip,
            take: limite,
        })
        const total = await this.contarTotal();
        const totalPaginas = Math.ceil(total / limite);

        return {
            planos,
            total,
            pagina,
            totalPaginas,
            porPagina: limite,
        }
    }
    
    async buscarPorId(id) {
        const plano = await planoRepository.buscarPorId(id);

        if(!plano) {
            const erro = new Error('Plano não encontrado');
            erro.status = 404;
            throw erro;
        }
        return plano;
    }

    async atualizar(id, dados) {

        const plano = await this.buscarPorId(id);

        if(Object.keys(dados).length > 0) {
            const validacao = validarPlano({
                nome: dados.nome ?? plano.nome,
                valor: dados.valor ?? plano.valor,
            });

            if(!validacao.valido) {
                const erro = new Error('Dados inválidos');
                erro.detalhes = validacao.erros;
                throw erro;
            }
        }

        return await planoRepository.atualizar(id, dados);
    }

    async deletar(id) {
        await this.buscarPorId(id);
        
        // Verifica se há pacientes usando este plano
        const pacientesComPlano = await prisma.paciente.count({
            where: { planoId: id }
        });
        
        // Verifica se há médicos usando este plano
        const medicosComPlano = await prisma.medico.count({
            where: { planoId: id }
        });
        
        if (pacientesComPlano > 0 || medicosComPlano > 0) {
            const erro = new Error('Você não pode excluir planos que estão em uso!');
            erro.status = 409;
            erro.detalhes = {
                pacientes: pacientesComPlano,
                medicos: medicosComPlano,
                mensagem: `Este plano está sendo utilizado por ${pacientesComPlano} paciente(s) e ${medicosComPlano} médico(s)`
            };
            throw erro;
        }
        
        return await planoRepository.deletar(id);
    }

    async contarTotal() {
        const total = await prisma.plano.count();
        return total;
    }
}
module.exports = new PlanoService();