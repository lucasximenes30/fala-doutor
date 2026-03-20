const { prisma } = require('../config/database')

class MedicoRepository {

    async criar(dados) {
        try {
            const medico = await prisma.medico.create({
               data: {
                nome: dados.nome,
                cpf: dados.cpf,
                crm: dados.crm,
                dataNascimento: new Date(dados.dataNascimento),
                planoId: dados.planoId,
               },
               include: { plano: true },
            })

            console.log(`Médico criado com ID: ${medico.id}`)
            return medico
        }catch (error) {
            console.error('Erro ao criar médico:', error.message)
            throw error
        }
    }

    async buscarTodos({ skip = 0, take = 10 } = {}) {
        try {
            const medicos = await prisma.medico.findMany({
                skip,
                take,
                orderBy: { id: 'desc' },
                include: { plano: true },
            })
            return medicos
        }catch (error) {
            console.error('Erro ao buscar médicos:', error.message)
            throw error
        }
    }

    async buscarPorId(id) {

        try {
            const medico = await prisma.medico.findUnique({
                where: {id: id},
                include: { plano: true },
            })

            return medico
        }catch (error) {
            console.error('Erro ao buscar médico por ID:', error.message)
            throw error
        }
    }
    async atualizar(id, dados) {
        try {
            const medico = await prisma.medico.update({
                where: { id: id },
                data: {
                    ...(dados.nome && { nome: dados.nome }),
                    ...(dados.cpf && { cpf: dados.cpf }),
                    ...(dados.crm && { crm: dados.crm}),
                    ...(dados.dataNascimento && { dataNascimento: new Date(dados.dataNascimento),
                    }),
                    ...(dados.planoId && { planoId: dados.planoId }),
                },
                include: { plano: true },
            })
            return medico
        }catch (error) {
            console.error('Erro ao atualizar médico:', error.message)
            throw error
        }
    }

    async deletar(id) {
        try {
            const medico = await prisma.medico.delete({
                where: { id: id},
            })
            return medico
        }catch (error) {
            console.error('Erro ao deletar médico:', error.message)
            throw error
        }
    }
    async desconectar() {
        await prisma.$disconnect()
    }
}
module.exports = new MedicoRepository()