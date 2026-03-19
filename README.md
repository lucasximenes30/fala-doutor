# FalaDoutor

Um sistema completo de gerenciamento de médicos e pacientes construído com **Node.js/Express** no back-end e **React** no front-end.

## 🎯 Características

- ✅ Gerenciamento de médicos e pacientes
- ✅ CRUD completo
- ✅ Validação de dados (CPF, CRM, Planos)
- ✅ Paginação de resultados
- ✅ Interface responsiva com Tailwind CSS
- ✅ Banco de dados com Prisma ORM

## 📋 Estrutura do Projeto

```
FalaDoutor/
├── back-end/          # API Node.js/Express
│   ├── src/
│   │   ├── config/       # Configuração de banco de dados
│   │   ├── controller/   # Controllers
│   │   ├── dto/          # Data Transfer Objects (formatação)
│   │   ├── repository/   # Acesso ao banco de dados
│   │   ├── routes/       # Definição de rotas
│   │   ├── service/      # Lógica de negócio
│   │   ├── validators/   # Validações de dados
│   │   └── server.js     # Inicialização do servidor
│   ├── prisma/
│   │   ├── schema.prisma # Modelo de dados
│   │   └── migrations/   # Histórico de migrações
│   ├── app.js            # Configuração do Express
│   ├── docker-compose.yml # Configuração do banco de dados
│   └── package.json
│
└── front-end/         # Interface React
    ├── src/
    │   ├── components/   # Componentes React
    │   ├── hooks/        # Custom hooks
    │   ├── assets/       # Arquivos estáticos
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js    # Configuração do Vite
    ├── tailwind.config.js
    └── package.json
```

## 🛠️ Tecnologias

### Back-end
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados (via Docker)

### Front-end
- **React** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP
- **React Hooks** - Gerenciamento de estado

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v16+)
- Docker e Docker Compose
- npm

### 1. Clone o Repositório
```bash
git clone <seu-repositorio>
cd FalaDoutor
```

### 2. Configurar Back-end

```bash
cd back-end

# Instale as dependências
npm install

# Inicie o banco de dados
docker-compose up -d

# Execute as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

O servidor rodará em `http://localhost:3000`

### 3. Configurar Front-end

```bash
cd ../front-end

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📚 API Endpoints

### Médicos

- `GET /medicos` - Lista todos os médicos (com paginação)
- `GET /medicos/:id` - Busca um médico por ID
- `POST /medicos` - Cria um novo médico
- `PUT /medicos/:id` - Atualiza um médico
- `DELETE /medicos/:id` - Deleta um médico

### Pacientes

- `GET /pacientes` - Lista todos os pacientes (com paginação)
- `GET /pacientes/:id` - Busca um paciente por ID
- `POST /pacientes` - Cria um novo paciente
- `PUT /pacientes/:id` - Atualiza um paciente
- `DELETE /pacientes/:id` - Deleta um paciente

### Formato de Requisição

#### Criar/Atualizar Médico
```json
{
  "nome": "Dr. João Silva",
  "cpf": "12345678900",
  "crm": "123456",
  "dataNascimento": "1990-05-15",
  "plano": 1
}
```

#### Criar/Atualizar Paciente
```json
{
  "nome": "Maria Santos",
  "cpf": "98765432100",
  "dataNascimento": "1985-03-20",
  "plano": 2
}
```

### Formato de Resposta

#### Sucesso
```json
{
  "sucesso": true,
  "mensagem": "Operação realizada com sucesso",
  "dados": {
    "id": "uuid",
    "nome": "João Silva",
    "cpf": "12345678900",
    "dataNascimento": "15/05/1990",
    "plano": 1,
    "createdAt": "2026-03-18 10:30:45",
    "updatedAt": "2026-03-18 10:30:45"
  }
}
```

#### Erro
```json
{
  "sucesso": false,
  "mensagem": "Erro ao criar item",
  "detalhes": ["CPF inválido", "Nome obrigatório"]
}
```

## 🔍 Validações

### Médico
- **Nome**: Obrigatório, máx 255 caracteres
- **CPF**: Obrigatório, 11 dígitos numéricos
- **CRM**: Obrigatório
- **Data de Nascimento**: Obrigatória, formato YYYY-MM-DD
- **Plano**: Obrigatório (1, 2 ou 3)

### Paciente
- **Nome**: Obrigatório, máx 255 caracteres
- **CPF**: Obrigatório, 11 dígitos numéricos
- **Data de Nascimento**: Obrigatória, formato YYYY-MM-DD
- **Plano**: Obrigatório (1, 2 ou 3)

## 📝 Comandos Úteis

### Back-end
```bash
# Iniciar servidor em desenvolvimento
npm run dev

# Ver logs do Prisma
npx prisma studio

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao
```

### Front-end
```bash
# Iniciar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🗄️ Banco de Dados

O projeto usa PostgreSQL rodando em Docker. As configurações estão em `docker-compose.yml`:

```bash
# Iniciar banco de dados
docker-compose up -d

# Parar banco de dados
docker-compose down
```

Credenciais padrão:
- **Usuário**: postgres
- **Senha**: postgres
- **Banco**: faladoutor
- **Host**: localhost:5432

## 🐛 Troubleshooting

### Erro ao conectar ao banco
- Certifique-se de que o Docker está rodando: `docker ps`
- Verifique se a porta 5432 não está em uso

### Erro na migração Prisma
```bash
# Reset do banco (cuidado: deleta todos os dados!)
npx prisma migrate reset
```

### Porta 3000 ou 5173 já em uso
- Altere as portas em `back-end/app.js` e `front-end/vite.config.js`

## 📖 Documentação Adicional

- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do React](https://react.dev/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)

## 👨‍💻 Autor

Lucas - FalaDoutor Project

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

---

**Desenvolvido com ❤️ em 2026**
