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

  async buscarTodos({ skip = 0, take = 10 } = {}) {
    try {
      const pacientes = await prisma.paciente.findMany({
        skip,
        take,
        orderBy: { id: 'desc' },
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
        where: { id: Number(id) },
      })

      console.log(
        paciente
          ? `Paciente com ID ${id} encontrado`
          : `Paciente com ID ${id} não encontrado`
      )

      return paciente
    } catch (error) {
      console.error('Erro ao buscar paciente por ID:', error.message)
      throw error
    }
  }

  async buscarPorCPF(cpf) {
    try {
      return await prisma.paciente.findUnique({
        where: { cpf },
      })
    } catch (error) {
      console.error('Erro ao buscar paciente por CPF:', error.message)
      throw error
    }
  }

  async atualizar(id, dados) {
    try {
      const paciente = await prisma.paciente.update({
        where: { id: Number(id) },
        data: {
          ...(dados.nome && { nome: dados.nome }),
          ...(dados.cpf && { cpf: dados.cpf }),
          ...(dados.dataNascimento && {
            dataNascimento: new Date(dados.dataNascimento),
          }),
          ...(dados.plano && { plano: dados.plano }),
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
        where: { id: Number(id) },
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