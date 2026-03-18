class Paciente {
  /**
   * Construtor do modelo Paciente
   * @param {number} id - ID único do paciente
   * @param {string} nome - Nome do paciente
   * @param {string} cpf - CPF do paciente (11 dígitos)
   * @param {Date} dataNascimento - Data de nascimento
   * @param {number} plano - Plano de saúde (1, 2 ou 3)
   */
  constructor(id, nome, cpf, dataNascimento, plano) {
    this.id = id
    this.nome = nome
    this.cpf = cpf
    this.dataNascimento = dataNascimento
    this.plano = plano
  }

  /**
   * Valida se os dados do paciente estão corretos
   * @returns {object} - Objeto com { valido: boolean, erros: array }
   */
  static validar(dados) {
    const erros = []

    // Validar nome
    if (!dados.nome || dados.nome.trim().length === 0) {
      erros.push('Nome é obrigatório')
    }
    if (dados.nome && dados.nome.length > 255) {
      erros.push('Nome não pode ter mais de 255 caracteres')
    }

    // Validar CPF (simples - apenas verifica formato)
    if (!dados.cpf || dados.cpf.length !== 11) {
      erros.push('CPF deve ter exatamente 11 dígitos')
    }

    // Validar data de nascimento
    if (!dados.dataNascimento) {
      erros.push('Data de nascimento é obrigatória')
    }

    // Validar plano
    if (!dados.plano || ![1, 2, 3].includes(dados.plano)) {
      erros.push('Plano deve ser 1, 2 ou 3')
    }

    return {
      valido: erros.length === 0,
      erros: erros,
    }
  }
}

module.exports = Paciente
