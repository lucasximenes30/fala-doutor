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

function toResponse(medico) {
    return {
        id: medico.id,
        nome: medico.nome,
        cpf: medico.cpf,
        crm: medico.crm,
        dataNascimento: formatDateToBrazilian(medico.dataNascimento),
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