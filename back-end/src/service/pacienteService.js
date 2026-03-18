const PacienteRepository = require('../repository/pacienteRepository')
const { validarPaciente } = require('../validators/pacienteValidator')

class PacienteService {

 async criar(dados) {
        const validacao = validarPaciente(dados);
         
        
        if (!validacao.valido) {
        const erro = new Error('Dados inválidos');
        erro.detalhes = validacao.erros;
        throw erro;
    }

    return await PacienteRepository.criar(dados);
    }

  async buscarTodos(pagina = 1, limite = 10) {
    pagina = Math.max(1, parseInt(pagina) || 1)
    limite = Math.max(1, Math.min(100, parseInt(limite) || 10))

    const skip = (pagina - 1) * limite

    const pacientes = await PacienteRepository.buscarTodos({
      skip,
      take: limite,
    })

    const total = await this.contarTotal()
    const totalPaginas = Math.ceil(total / limite)

    return {
      pacientes,
      total,
      pagina,
      totalPaginas,
      porPagina: limite,
    }
  }

  async buscarPorId(id) {


    const paciente = await PacienteRepository.buscarPorId(id)

    if (!paciente) {
      const erro = new Error('Paciente não encontrado')
      erro.status = 404
      throw erro
    }

    return paciente
  }

async atualizar(id, dados) {
  const paciente = await this.buscarPorId(id)

  if (Object.keys(dados).length > 0) {
    const validacao = validarPaciente({
      nome: dados.nome ?? paciente.nome,
      cpf: dados.cpf ?? paciente.cpf,
      dataNascimento: dados.dataNascimento ?? paciente.dataNascimento,
      plano: dados.plano ?? paciente.plano,
    })

    if (!validacao.valido) {
      const erro = new Error('Dados inválidos')
      erro.detalhes = validacao.erros
      throw erro
    }
  }

  return await PacienteRepository.atualizar(id, dados)
}

  async deletar(id) {
    await this.buscarPorId(id)
    return await PacienteRepository.deletar(id)
  }

  async contarTotal() {
    const prisma = new (require('@prisma/client').PrismaClient)()
    const total = await prisma.paciente.count()
    return total
  }
}

module.exports = new PacienteService()