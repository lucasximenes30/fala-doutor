const medicoRepository = require('../repository/medicoRepository');
const { validarMedico } = require('../validators/medicoValidator');
const { prisma } = require('../config/database');

class MedicoService {
    
    async criar(dados) {
        const validacao = validarMedico(dados);
         
        if (!validacao.valido) {
            const erro = new Error('Dados inválidos');
            erro.detalhes = validacao.erros;
            throw erro;
        }

        // Verifica se o plano existe
        const planoExiste = await prisma.plano.findUnique({
            where: { id: dados.plano }
        });

        if (!planoExiste) {
            const erro = new Error('Plano não encontrado');
            erro.status = 404;
            throw erro;
        }

        // Passa planoId para o repository
        return await medicoRepository.criar({
            ...dados,
            planoId: dados.plano
        });
    }


    async buscarTodos(pagina = 1, limite = 10) {
        pagina = Math.max(1, parseInt(pagina) || 1);
        limite = Math.max(1, Math.min(100, parseInt(limite) || 10));

        const skip = (pagina - 1) * limite;

        const medicos = await medicoRepository.buscarTodos({
            skip,
            take: limite,
        })
        const total = await this.contarTotal();
        const totalPaginas = Math.ceil(total / limite);
        
        return {
            medicos,
            total,
            pagina,
            totalPaginas,
            porPagina: limite,
        }
    }

    async buscarPorId(id) {
        
        const medico = await medicoRepository.buscarPorId(id);
        
        if (!medico) {
            const erro = new Error('Médico não encontrado');
            erro.status = 404;
            throw erro;
        }
        return medico;
    }

    async atualizar(id, dados) {
        const medico = await this.buscarPorId(id);
    
        if ( Object.keys(dados).length > 0) {
            const validacao = validarMedico({
                nome: dados.nome ?? medico.nome,
                cpf: dados.cpf ?? medico.cpf,
                crm: dados.crm ?? medico.crm,
                dataNascimento: dados.dataNascimento ?? medico.dataNascimento,
                plano: dados.plano ?? medico.planoId,
            })

            if (!validacao.valido) {
                const erro = new Error('Dados inválidos');
                erro.detalhes = validacao.erros;
                throw erro;
            }
        }

        // Se tiver atualizando o plano, verifica se existe
        if (dados.plano) {
            const planoExiste = await prisma.plano.findUnique({
                where: { id: dados.plano }
            });

            if (!planoExiste) {
                const erro = new Error('Plano não encontrado');
                erro.status = 404;
                throw erro;
            }

            dados.planoId = dados.plano;
            delete dados.plano;
        }

        return await medicoRepository.atualizar(id, dados);
    }

    async deletar(id) {
        await this.buscarPorId(id);
        return await medicoRepository.deletar(id);
    }

    async contarTotal() {
        const total = await prisma.medico.count();
        return total;
    }
}
module.exports = new MedicoService()