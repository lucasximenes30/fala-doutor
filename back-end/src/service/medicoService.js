const medicoRepository = require('../repository/medicoRepository');
const { validarMedico } = require('../validators/medicoValidator');

class MedicoService {
    
    async criar(dados) {
        const validacao = validarMedico(dados);
         
        
        if (!validacao.valido) {
        const erro = new Error('Dados inválidos');
        erro.detalhes = validacao.erros;
        throw erro;
    }

    return await medicoRepository.criar(dados);
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
}