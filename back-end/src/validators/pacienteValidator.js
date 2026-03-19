function validarPaciente(dados) {
  const erros = []

  if (!dados.nome || !dados.nome.trim()) {
    erros.push('Nome é obrigatório')
  }

  if (dados.nome && dados.nome.length > 255) {
    erros.push('Nome não pode ter mais de 255 caracteres')
  }

  if (!dados.cpf) {
      erros.push('O CPF é obrigatório.');
  } else {

    //Remove tudo que não for número (pontos, traços, espaços, letras)
  const cpfLimpo = String(dados.cpf).replace(/[^\d]/g, '');

    
  if (cpfLimpo.length !== 11) {
      erros.push('O CPF deve ter exatamente 11 dígitos numéricos.');
    }  
    dados.cpf = cpfLimpo; 
  }

  if (!dados.dataNascimento) {
    erros.push('Data de nascimento é obrigatória')
  }


  const planoNumerico = Number(dados.plano)
  if (![1, 2, 3].includes(planoNumerico)) {
    erros.push('Plano deve ser 1, 2 ou 3')
  }
  dados.plano = planoNumerico

  return {
    valido: erros.length === 0,
    erros
  }
}

module.exports = { validarPaciente }