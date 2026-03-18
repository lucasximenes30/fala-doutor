/**
 * server.js
 * 
 * ARQUIVO PRINCIPAL DO SERVIDOR
 * =============================
 * Aqui inicializamos o Express, configuramos middleware e rotas
 */

require('dotenv').config() // Carrega variáveis de ambiente do .env

const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/database')

// Importar rotas
const pacienteRoutes = require('./routes/PacienteRoutes')

const app = express()
const PORT = process.env.PORT || 3000

/**
 * MIDDLEWARE
 * ==========
 * Middleware são funções que processam requisições
 */

// CORS - Permite requisições de outros domínios
app.use(cors())

// Parsear JSON - Converte corpo da requisição em JSON
app.use(express.json())

/**
 * ROTAS
 * =====
 */

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API FalaDoutor rodando 🚀',
    versao: '1.0.0',
  })
})

// Rotas de Paciente
app.use('/pacientes', pacienteRoutes)

/**
 * TRATAMENTO DE ERROS
 * ===================
 */

// Rota 404 - Quando nenhuma rota coincide
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada',
  })
})

/**
 * INICIAR SERVIDOR
 * ================
 */

async function iniciarServidor() {
  try {
    // Conectar ao banco de dados
    await connectDB()

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`\n✅ Servidor rodando em: http://localhost:${PORT}`)
      console.log(`📚 API de Pacientes disponível em: http://localhost:${PORT}/pacientes\n`)
    })
  } catch (erro) {
    console.error('❌ Erro ao iniciar servidor:', erro)
    process.exit(1)
  }
}

// Executar
iniciarServidor()