function formatDateTime(date) {
    return new Date(date)
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19)
}

function toResponse(plano) {
    return {
        id: plano.id,
        nome: plano.nome,
        valor: plano.valor,
        createdAt: formatDateTime(plano.createdAt),
        updatedAt: formatDateTime(plano.updatedAt),
    }
}

function toListResponse(planos) {
    return planos.map(toResponse)
}

module.exports = {
    toResponse,
    toListResponse,
}