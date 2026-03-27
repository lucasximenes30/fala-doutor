const consultaRepository = require('../repository/consultaRepository');
const { validarConsulta } = require('../validators/consultaValidator');
const { prisma } = require('../config/database');

class ConsultaService {
    
    async criar(dados) {
        const validacao = validarConsulta(dados);
         
        if (!validacao.valido) {
            const erro = new Error('Dados inválidos');
            erro.detalhes = validacao.erros;
            throw erro;
        }

        // Valida se a data/hora é anterior a agora
        const dataSelecionada = new Date(dados.data);
        const agora = new Date();

        if (dataSelecionada <= agora) {
            const erro = new Error('Consulta deve ser agendada para uma hora futura');
            erro.status = 400;
            throw erro;
        }

        // Verifica se o médico existe
        const medicoExiste = await prisma.medico.findUnique({
            where: { id: dados.medico },
            include: { plano: true }
        });

        if (!medicoExiste) {
            const erro = new Error('Médico não encontrado');
            erro.status = 404;
            throw erro;
        }

        // Verifica se o paciente existe
        const pacienteExiste = await prisma.paciente.findUnique({
            where: { id: dados.paciente },
            include: { plano: true }
        });

        if (!pacienteExiste) {
            const erro = new Error('Paciente não encontrado');
            erro.status = 404;
            throw erro;
        }

        // VALIDAÇÃO IMPORTANTE: Verifica se o paciente tem o mesmo plano do médico
        if (medicoExiste.planoId !== pacienteExiste.planoId) {
            const erro = new Error('O paciente deve ter o mesmo plano do médico');
            erro.status = 400;
            erro.detalhes = {
                planoMedico: medicoExiste.plano.nome,
                planoPaciente: pacienteExiste.plano.nome
            };
            throw erro;
        }

        // O VALOR vem automaticamente do plano do médico
        return await consultaRepository.criar({
            ...dados,
            medicoId: dados.medico,
            pacienteId: dados.paciente,
            valor: medicoExiste.plano.valor,
        });
    }


    async buscarTodos(pagina = 1, limite = 10) {
        pagina = Math.max(1, parseInt(pagina) || 1);
        limite = Math.max(1, Math.min(100, parseInt(limite) || 10));

        const skip = (pagina - 1) * limite;

        const consultas = await consultaRepository.buscarTodos({
            skip,
            take: limite,
        })
        const total = await this.contarTotal();
        const totalPaginas = Math.ceil(total / limite);
        
        return {
            consultas,
            total,
            pagina,
            totalPaginas,
            porPagina: limite,
        }
    }

    async buscarPorId(id) {
        
        const consulta = await consultaRepository.buscarPorId(id);
        
        if (!consulta) {
            const erro = new Error('Consulta não encontrada');
            erro.status = 404;
            throw erro;
        }
        return consulta;
    }

    async atualizar(id, dados) {
        const consulta = await this.buscarPorId(id);
    
        if (Object.keys(dados).length > 0) {
            const validacao = validarConsulta({
                data: dados.data ?? consulta.data.toISOString(),
                medico: dados.medico ?? consulta.medicoId,
                paciente: dados.paciente ?? consulta.pacienteId,
            })

            if (!validacao.valido) {
                const erro = new Error('Dados inválidos');
                erro.detalhes = validacao.erros;
                throw erro;
            }

            // Valida se a data/hora é anterior a agora (se foi fornecida)
            if (dados.data) {
                const dataSelecionada = new Date(dados.data);
                const agora = new Date();

                if (dataSelecionada <= agora) {
                    const erro = new Error('Consulta deve ser agendada para uma hora futura');
                    erro.status = 400;
                    throw erro;
                }
            }

            // Se tiver atualizando o médico ou paciente, valida as relações
            const medicoIdAtual = dados.medico ?? consulta.medicoId;
            const pacienteIdAtual = dados.paciente ?? consulta.pacienteId;

            const medicoExiste = await prisma.medico.findUnique({
                where: { id: medicoIdAtual },
                include: { plano: true }
            });

            if (!medicoExiste) {
                const erro = new Error('Médico não encontrado');
                erro.status = 404;
                throw erro;
            }

            const pacienteExiste = await prisma.paciente.findUnique({
                where: { id: pacienteIdAtual },
                include: { plano: true }
            });

            if (!pacienteExiste) {
                const erro = new Error('Paciente não encontrado');
                erro.status = 404;
                throw erro;
            }

            // Valida se estão no mesmo plano
            if (medicoExiste.planoId !== pacienteExiste.planoId) {
                const erro = new Error('O paciente deve ter o mesmo plano do médico');
                erro.status = 400;
                erro.detalhes = {
                    planoMedico: medicoExiste.plano.nome,
                    planoPaciente: pacienteExiste.plano.nome
                };
                throw erro;
            }

            // Se tiver mudado o médico, atualiza o valor com o novo plano
            if (dados.medico) {
                dados.valor = medicoExiste.plano.valor;
            }
        }

        // Transforma 'medico' e 'paciente' em 'medicoId' e 'pacienteId'
        if (dados.medico) {
            dados.medicoId = dados.medico;
            delete dados.medico;
        }

        if (dados.paciente) {
            dados.pacienteId = dados.paciente;
            delete dados.paciente;
        }

        return await consultaRepository.atualizar(id, dados);
    }

    async deletar(id) {
        await this.buscarPorId(id);
        return await consultaRepository.deletar(id);
    }

    async contarTotal() {
        const total = await prisma.consulta.count();
        return total;
    }
}

module.exports = new ConsultaService()
