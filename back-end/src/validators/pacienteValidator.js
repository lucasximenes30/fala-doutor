function validarPaciente(dados) {
  const erros = []

  if (!dados.nome || !dados.nome.trim()) {
    erros.push('Nome é obrigatório')
  }

  if (dados.nome && dados.nome.length > 255) {
    erros.push('Nome não pode ter mais de 255 caracteres')
  }

  if (!dados.cpf) {
    erros.push('O CPF é obrigatório.')
  } else {
    const cpfLimpo = String(dados.cpf).replace(/[^\d]/g, '')

    if (cpfLimpo.length !== 11) {
      erros.push('O CPF deve ter exatamente 11 dígitos numéricos.')
    }

    dados.cpf = cpfLimpo
  }

  if (!dados.dataNascimento) {
    erros.push('Data de nascimento é obrigatória')
  }

  if (!dados.plano || !dados.plano.trim()) {
    erros.push('Plano é obrigatório')
  }

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (dados.plano && !uuidRegex.test(String(dados.plano).trim())) {
    erros.push('Plano deve ser um UUID válido')
  }

  return {
    valido: erros.length === 0,
    erros
  }
}

module.exports = { validarPaciente }