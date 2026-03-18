const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function connectDB() {
  try {
    await prisma.$connect()
    console.log('Conectado ao banco de dados')
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error.message)
    process.exit(1)
  }
}

module.exports = {
  prisma,
  connectDB,
}
