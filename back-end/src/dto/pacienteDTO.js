function formatDateToBrazilian(date) {
  const d = new Date(date)
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const ano = d.getFullYear()
  return `${dia}/${mes}/${ano}`
}

function formatDateTime(date) {
  return new Date(date)
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19)
}

function toResponse(paciente) {
  return {
    id: paciente.id,
    nome: paciente.nome,
    cpf: paciente.cpf,
    dataNascimento: formatDateToBrazilian(paciente.dataNascimento),
    plano: paciente.plano,
    createdAt: formatDateTime(paciente.createdAt),
    updatedAt: formatDateTime(paciente.updatedAt),
  }
}

function toListResponse(pacientes) {
  return pacientes.map(toResponse)
}

module.exports = {
  toResponse,
  toListResponse,
}