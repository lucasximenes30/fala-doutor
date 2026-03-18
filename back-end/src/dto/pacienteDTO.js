function formatDate(date) {
  return new Date(date).toISOString().split('T')[0]
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
    dataNascimento: formatDate(paciente.dataNascimento),
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