function formarDate(date) {
    return new Date(date).toISOString().split('T')[0]
}

function formatDateTime(date) {
    return new Date(date)
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19)
}

function toResponse(medico) {
    return {
        id: medico.id,
        nome: medico.nome,
        cpf: medico.cpf,
        crm: medico.crm,
        dataNascimento: formarDate(medico.dataNascimento),
        plano: medico.plano,
        createdAt: formatDateTime(medico.createdAt),
        updatedAt: formatDateTime(medico.updatedAt),
    }   
}

function toListResponse(medicos) {
    return medicos.map(toResponse)
}

module.exports = {
    toResponse,
    toListResponse,
}