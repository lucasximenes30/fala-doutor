const { prisma } = require('../config/database')

class PacienteRepository {

  async criar(dados) {
    try {
      const paciente = await prisma.paciente.create({
        data: {
          nome: dados.nome,
          cpf: dados.cpf,
          dataNascimento: new Date(dados.dataNascimento),
          planoId: dados.planoId,
        },
        include: { plano: true },
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
        include: { plano: true },
      })

      return pacientes

    } catch (error) {
      console.error('Erro ao buscar pacientes:', error.message)
      throw error
    }
  }

  async buscarPorId(id) {
    try {
      const paciente = await prisma.paciente.findUnique({
        where: { id:id },
        include: { plano: true },
      })

      return paciente

    } catch (error) {
      console.error('Erro ao buscar paciente por ID:', error.message)
      throw error
    }
  }

  async atualizar(id, dados) {
    try {
      const paciente = await prisma.paciente.update({
        where: { id: id },
        data: {
          ...(dados.nome && { nome: dados.nome }),
          ...(dados.cpf && { cpf: dados.cpf }),
          ...(dados.dataNascimento && {
            dataNascimento: new Date(dados.dataNascimento),
          }),
          ...(dados.planoId && { planoId: dados.planoId }),
        },
        include: { plano: true },
      })

      return paciente

    } catch (error) {
      console.error('Erro ao atualizar paciente:', error.message)
      throw error
    }
  }

  async deletar(id) {
    try {
      const paciente = await prisma.paciente.delete({
        where: { id: id },
      })

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