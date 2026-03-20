const { prisma } = require('../config/database')

class PlanoRepository {
    
    async criar(dados) {
        try{
            const plano = await prisma.plano.create({
                data: {
                    nome: dados.nome,
                    valor: dados.valor,
                },
            })
            return plano
            
        }catch (error) {
            console.error('Erro ao criar plano:', error.message)
            throw error
        }
    }

    async buscarTodos({ skip = 0, take = 10 } = {}) {
        try {
            const planos = await prisma.plano.findMany({
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            })
            return planos
        }catch (error) {
            console.error('Erro ao buscar planos:', error.message)
            throw error
        }
    }

    async buscarPorId(id) {
        try {
            const plano = await prisma.plano.findUnique({
                where: { id },
            })
            return plano
        }catch (error) {
            console.error('Erro ao buscar plano por ID:', error.message)
            throw error
        }
    }

    async atualizar(id, dados) {
        try {
            const plano = await prisma.plano.update({
                where: { id },
                data: {
                    ...(dados.nome && { nome: dados.nome }),
                    ...(dados.valor && { valor: dados.valor }),
                },
            })
            return plano
        }catch (error) {
            console.error('Erro ao atualizar plano:', error.message)
            throw error
        }
    }

    async deletar(id) {
        try {
            const plano = await prisma.plano.delete({
                where: { id },

            })
            return plano
        }catch (error) {
            console.error('Erro ao deletar plano:', error.message)
            throw error
        }
    }

    async desconectar() {
        await prisma.$disconnect()
    }
}

module.exports = new PlanoRepository()