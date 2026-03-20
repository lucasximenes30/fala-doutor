function validarPlano(dados) {
    const erros = []

    // Nome obrigatório
    if (!dados.nome || !dados.nome.trim()) {
        erros.push('Nome do plano é obrigatório')
    }

    if (dados.nome && dados.nome.length > 255) {
        erros.push('Nome não pode ter mais de 255 caracteres')
    }

    // Valor obrigatório
    if (dados.valor === undefined || dados.valor === null) {
        erros.push('Valor do plano é obrigatório')
    } else {
        const valorNumerico = Number(dados.valor)

        if (isNaN(valorNumerico)) {
            erros.push('Valor deve ser um número válido')
        }

        if (valorNumerico < 0) {
            erros.push('Valor não pode ser negativo')
        }

        dados.valor = valorNumerico
    }

    return {
        valido: erros.length === 0,
        erros
    }
}

module.exports = { validarPlano }