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

function formatDateTimeWithHour(date) {
    const d = new Date(date)
    const dia = String(d.getDate()).padStart(2, '0')
    const mes = String(d.getMonth() + 1).padStart(2, '0')
    const ano = d.getFullYear()
    const horas = String(d.getHours()).padStart(2, '0')
    const minutos = String(d.getMinutes()).padStart(2, '0')
    const segundos = String(d.getSeconds()).padStart(2, '0')
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`
}

function toResponse(consulta) {
    return {
        id: consulta.id,
        data: formatDateTimeWithHour(consulta.data),
        medico: consulta.medico ? {
            id: consulta.medico.id,
            nome: consulta.medico.nome,
            crm: consulta.medico.crm,
            plano: consulta.medico.plano ? {
                id: consulta.medico.plano.id,
                nome: consulta.medico.plano.nome,
                valor: consulta.medico.plano.valor.toString(),
            } : null,
        } : null,
        paciente: consulta.paciente ? {
            id: consulta.paciente.id,
            nome: consulta.paciente.nome,
            cpf: consulta.paciente.cpf,
            plano: consulta.paciente.plano ? {
                id: consulta.paciente.plano.id,
                nome: consulta.paciente.plano.nome,
            } : null,
        } : null,
        valor: consulta.valor.toString(),
        createdAt: formatDateTime(consulta.createdAt),
        updatedAt: formatDateTime(consulta.updatedAt),
    }   
}

function toListResponse(consultas) {
    return consultas.map(toResponse)
}

module.exports = {
    toResponse,
    toListResponse,
}
