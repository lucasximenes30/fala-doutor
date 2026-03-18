function validarMedico(dados) {
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

    if (!dados.crm || !dados.crm.trim()) {
        erros.push('CRM é obrigatório')
    }

    if (![1,2,3].includes(dados.plano)) {
        erros.push('Plano inválido')
    }

    return {
        valido: erros.length === 0,
        erros
    }

}

module.exports = { validarMedico }