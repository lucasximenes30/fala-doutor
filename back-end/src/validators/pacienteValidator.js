function validarPaciente(dados) {
  const erros = []

  if (!dados.nome || !dados.nome.trim()) {
    erros.push('Nome é obrigatório')
  }

  if (dados.nome && dados.nome.length > 255) {
    erros.push('Nome não pode ter mais de 255 caracteres')
  }

  if (!dados.cpf || dados.cpf.length !== 11 || isNaN(dados.cpf)) {
    erros.push('CPF deve ter exatamente 11 dígitos')
  }

  if (!dados.dataNascimento) {
    erros.push('Data de nascimento é obrigatória')
  }

  if (![1, 2, 3].includes(dados.plano)) {
    erros.push('Plano deve ser 1, 2 ou 3')
  }

  return {
    valido: erros.length === 0,
    erros
  }
}

module.exports = { validarPaciente }