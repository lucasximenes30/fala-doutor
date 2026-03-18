
require('dotenv').config() 

const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/database')


const pacienteRoutes = require('./routes/PacienteRoutes')

const app = express()
const PORT = process.env.PORT || 3000




app.use(cors())

app.use(express.json())


// Rota de teste
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API FalaDoutor rodando com sucesso!',
    versao: '1.0.0',
  })
})

// Rotas de Paciente
app.use('/pacientes', pacienteRoutes)


app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada',
  })
})



async function iniciarServidor() {
  try {

    await connectDB()

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`\nServidor rodando em: http://localhost:${PORT}`)
      console.log(`API de Pacientes disponível em: http://localhost:${PORT}/pacientes\n`)
    })
  } catch (erro) {
    console.error('Erro ao iniciar servidor:', erro)
    process.exit(1)
  }
}


iniciarServidor()