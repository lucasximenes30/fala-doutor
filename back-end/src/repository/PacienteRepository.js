const { prisma } = require('../config/database')

class PacienteRepository {

  async criar(dados) {
    try {
      const paciente = await prisma.paciente.create({
        data: {
          nome: dados.nome,
          cpf: dados.cpf,
          dataNascimento: new Date(dados.dataNascimento),
          plano: dados.plano,
        },
      })

      console.log(`Paciente criado com ID: ${paciente.id}`)
      return paciente
    } catch (error) {
      console.error('Erro ao criar paciente:', error.message)
      throw error
    }
  }

  async buscarTodos(opcoes = {}) {
    try {
      const pacientes = await prisma.paciente.findMany({
        skip: opcoes.skip || 0,
        take: opcoes.take || 10,
        orderBy: {
          id: 'desc', // Ordenar pelo mais recente
        },
      })

      console.log(`Foram encontrados ${pacientes.length} pacientes`)
      return pacientes
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error.message)
      throw error
    }
  }

  async buscarPorId(id) {
    try {
      const paciente = await prisma.paciente.findUnique({
        where: { id: parseInt(id) },
      })

      if (paciente) {
        console.log(`Paciente com ID ${id} encontrado`)
      } else {
        console.log(`Paciente com ID ${id} não encontrado`)
      }

      return paciente
    } catch (error) {
      console.error('Erro ao buscar paciente por ID:', error.message)
      throw error
    }
  }

  async buscarPorCPF(cpf) {
    try {
      const paciente = await prisma.paciente.findUnique({
        where: { cpf: cpf },
      })

      return paciente
    } catch (error) {
      console.error('Erro ao buscar paciente por CPF:', error.message)
      throw error
    }
  }

  async atualizar(id, dados) {
    try {
      const paciente = await prisma.paciente.update({
        where: { id: parseInt(id) },
        data: {
          nome: dados.nome || undefined,
          cpf: dados.cpf || undefined,
          dataNascimento: dados.dataNascimento
            ? new Date(dados.dataNascimento)
            : undefined,
          plano: dados.plano || undefined,
        },
      })

      console.log(`Paciente com ID ${id} atualizado`)
      return paciente
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error.message)
      throw error
    }
  }

  async deletar(id) {
    try {
      const paciente = await prisma.paciente.delete({
        where: { id: parseInt(id) },
      })

      console.log(`Paciente com ID ${id} deletado`)
      return paciente
    } catch (error) {
      console.error('Erro ao deletar paciente:', error.message)
      throw error
    }
  }

  async desconectar() {
    await prisma.$disconnect()
  }
}

module.exports = new PacienteRepository()
