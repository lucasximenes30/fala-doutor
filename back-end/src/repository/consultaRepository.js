const { prisma } = require('../config/database')

class ConsultaRepository {

    async criar(dados) {
        try {
            const consulta = await prisma.consulta.create({
               data: {
                data: new Date(dados.data),
                medicoId: dados.medicoId,
                pacienteId: dados.pacienteId,
                valor: dados.valor,
               },
               include: { 
                   medico: {
                       include: { plano: true }
                   },
                   paciente: {
                       include: { plano: true }
                   }
               },
            })

            console.log(`Consulta criada com ID: ${consulta.id}`)
            return consulta
        }catch (error) {
            console.error('Erro ao criar consulta:', error.message)
            throw error
        }
    }

    async buscarTodos({ skip = 0, take = 10 } = {}) {
        try {
            const consultas = await prisma.consulta.findMany({
                skip,
                take,
                orderBy: { data: 'desc' },
                include: { 
                    medico: {
                        include: { plano: true }
                    },
                    paciente: {
                        include: { plano: true }
                    }
                },
            })
            return consultas
        }catch (error) {
            console.error('Erro ao buscar consultas:', error.message)
            throw error
        }
    }

    async buscarPorId(id) {
        try {
            const consulta = await prisma.consulta.findUnique({
                where: { id: id },
                include: { 
                    medico: {
                        include: { plano: true }
                    },
                    paciente: {
                        include: { plano: true }
                    }
                },
            })

            return consulta
        }catch (error) {
            console.error('Erro ao buscar consulta por ID:', error.message)
            throw error
        }
    }

    async atualizar(id, dados) {
        try {
            const consulta = await prisma.consulta.update({
                where: { id: id },
                data: {
                    ...(dados.data && { data: new Date(dados.data) }),
                    ...(dados.medicoId && { medicoId: dados.medicoId }),
                    ...(dados.pacienteId && { pacienteId: dados.pacienteId }),
                    ...(dados.valor && { valor: dados.valor }),
                },
                include: { 
                    medico: {
                        include: { plano: true }
                    },
                    paciente: {
                        include: { plano: true }
                    }
                },
            })
            return consulta
        }catch (error) {
            console.error('Erro ao atualizar consulta:', error.message)
            throw error
        }
    }

    async deletar(id) {
        try {
            const consulta = await prisma.consulta.delete({
                where: { id: id },
            })
            return consulta
        }catch (error) {
            console.error('Erro ao deletar consulta:', error.message)
            throw error
        }
    }

    async desconectar() {
        await prisma.$disconnect()
    }
}

module.exports = new ConsultaRepository()
