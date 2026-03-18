/**
 * service/PacienteService.js
 * 
 * CAMADA DE SERVICE (LÓGICA DE NEGÓCIOS)
 * ======================================
 * Responsável pela lógica de negócios da aplicação
 * Valida dados, aplica regras de negócio, chama o Repository
 * 
 * Principios:
 * - Centraliza a lógica de negócio
 * - Valida dados antes de salvar
 * - Trata erros de forma consistente
 * - Pode chamar múltiplos Repositories
 */

const PacienteRepository = require('../repository/PacienteRepository')
const Paciente = require('../model/Paciente')

class PacienteService {
  /**
   * Criar um novo paciente com validações
   * @param {object} dados - { nome, cpf, dataNascimento, plano }
   * @returns {Promise<object>} - Paciente criado ou erro
   */
  async criar(dados) {
    // 1. VALIDAR os dados usando o modelo
    const validacao = Paciente.validar(dados)

    if (!validacao.valido) {
      const erro = new Error('Dados inválidos')
      erro.detalhes = validacao.erros
      throw erro
    }

    // 2. VERIFICAR se CPF já existe (validação de negócio)
    const pacienteExistente = await PacienteRepository.buscarPorCPF(dados.cpf)

    if (pacienteExistente) {
      const erro = new Error('CPF já cadastrado')
      erro.detalhes = [`Já existe um paciente com o CPF ${dados.cpf}`]
      throw erro
    }

    // 3. CHAMAR o Repository para salvar no banco
    const paciente = await PacienteRepository.criar(dados)

    // 4. RETORNAR o resultado
    return paciente
  }

  /**
   * Buscar todos os pacientes com paginação
   * @param {number} pagina - Número da página (começa em 1)
   * @param {number} limite - Quantidade de itens por página
   * @returns {Promise<object>} - { pacientes: [], total, pagina, totalPaginas }
   */
  async buscarTodos(pagina = 1, limite = 10) {
    // Validar parâmetros
    pagina = Math.max(1, parseInt(pagina) || 1)
    limite = Math.max(1, Math.min(100, parseInt(limite) || 10))

    // Calcular skip (quantos registros pular)
    const skip = (pagina - 1) * limite

    // Buscar pacientes com limite e paginação
    const pacientes = await PacienteRepository.buscarTodos({
      skip: skip,
      take: limite,
    })

    // Buscar total de pacientes (para calcular totalPaginas)
    const total = await this.contarTotal()

    const totalPaginas = Math.ceil(total / limite)

    return {
      pacientes: pacientes,
      total: total,
      pagina: pagina,
      totalPaginas: totalPaginas,
      porPagina: limite,
    }
  }

  /**
   * Buscar um paciente por ID
   * @param {number} id - ID do paciente
   * @returns {Promise<object>} - Paciente ou erro 404
   */
  async buscarPorId(id) {
    // Validar se ID é um número válido
    if (!id || isNaN(id)) {
      const erro = new Error('ID inválido')
      erro.status = 400
      throw erro
    }

    // Buscar no banco
    const paciente = await PacienteRepository.buscarPorId(id)

    // Se não encontrou, lançar erro 404
    if (!paciente) {
      const erro = new Error('Paciente não encontrado')
      erro.status = 404
      throw erro
    }

    return paciente
  }

  /**
   * Atualizar um paciente
   * @param {number} id - ID do paciente
   * @param {object} dados - Dados a atualizar
   * @returns {Promise<object>} - Paciente atualizado
   */
  async atualizar(id, dados) {
    // 1. Verificar se paciente existe
    const paciente = await this.buscarPorId(id)

    // 2. Se está tentando atualizar CPF, validar que não existe outro igual
    if (dados.cpf && dados.cpf !== paciente.cpf) {
      const cpfDuplicado = await PacienteRepository.buscarPorCPF(dados.cpf)
      if (cpfDuplicado) {
        const erro = new Error('CPF já cadastrado')
        erro.detalhes = [`Já existe um paciente com o CPF ${dados.cpf}`]
        throw erro
      }
    }

    // 3. Validar dados fornecidos (se houver)
    if (Object.keys(dados).length > 0) {
      const validacao = Paciente.validar({
        nome: dados.nome || paciente.nome,
        cpf: dados.cpf || paciente.cpf,
        dataNascimento: dados.dataNascimento || paciente.dataNascimento,
        plano: dados.plano || paciente.plano,
      })

      if (!validacao.valido) {
        const erro = new Error('Dados inválidos')
        erro.detalhes = validacao.erros
        throw erro
      }
    }

    // 4. Atualizar no banco
    return await PacienteRepository.atualizar(id, dados)
  }

  /**
   * Deletar um paciente
   * @param {number} id - ID do paciente
   * @returns {Promise<object>} - Paciente deletado
   */
  async deletar(id) {
    // Verificar se paciente existe antes de deletar
    await this.buscarPorId(id)

    // Deletar
    return await PacienteRepository.deletar(id)
  }

  /**
   * Método helper para contar total de pacientes
   * @returns {Promise<number>} - Total de pacientes
   */
  async contarTotal() {
    return await require('@prisma/client').PrismaClient.constructor.$queryRaw`
      SELECT COUNT(*) FROM "Paciente"
    `
  }
}

module.exports = new PacienteService()
