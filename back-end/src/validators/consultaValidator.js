function validarConsulta(dados) {
    const erros = []
    
    if (!dados.data || !dados.data.trim()) {
        erros.push('Data e hora são obrigatórias')
    } else {
        // Valida se é uma data válida
        const data = new Date(dados.data)
        if (isNaN(data.getTime())) {
            erros.push('Data deve estar em formato válido (ex: 2025-03-27T14:30:00)')
        }
    }

    if (!dados.medico || !dados.medico.trim()) {
        erros.push('Médico é obrigatório')
    } else {
        // Valida se é um UUID válido
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(String(dados.medico).trim())) {
            erros.push('Médico deve ser um UUID válido')
        }
    }

    if (!dados.paciente || !dados.paciente.trim()) {
        erros.push('Paciente é obrigatório')
    } else {
        // Valida se é um UUID válido
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        if (!uuidRegex.test(String(dados.paciente).trim())) {
            erros.push('Paciente deve ser um UUID válido')
        }
    }

    return {
        valido: erros.length === 0,
        erros
    }
}

module.exports = { validarConsulta }
