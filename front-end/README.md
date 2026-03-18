# FalaDoutor - Front-end

Aplicação React moderna e bonita para gerenciar pacientes e médicos através da API FalaDoutor.

## 📋 Features

- ✅ Gerenciamento completo de pacientes (CRUD)
- ✅ Gerenciamento completo de médicos (CRUD)
- ✅ Interface responsiva e moderna
- ✅ Design gradiente e cores vibrantes
- ✅ Tabas para alternar entre pacientes e médicos
- ✅ Formulários intuitivos com validação
- ✅ Cards bem estruturados para visualização de dados
- ✅ Animações suaves
- ✅ Integração completa com a API backend

## 🚀 Como rodar

### Pré-requisitos

- Node.js (versão 16+)
- npm (versão 8+)
- Back-end da API rodando em `http://localhost:3000`

### Instalação

```bash
cd front-end
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

### Preview da build de produção

```bash
npm run preview
```

## 🛠 Stack Tecnológico

- **React 18** - Framework UI
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **PostCSS** - CSS processing

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── PacientesList.jsx      # Lista de pacientes
│   ├── PacienteCard.jsx       # Card individual de paciente
│   ├── PacienteForm.jsx       # Formulário de paciente
│   ├── MedicosList.jsx        # Lista de médicos
│   ├── MedicoCard.jsx         # Card individual de médico
│   └── MedicoForm.jsx         # Formulário de médico
├── hooks/
│   └── useAPI.js              # Hook customizado para requisições
├── App.jsx                    # Componente principal
├── App.css                    # Estilos da app
└── index.css                  # Estilos globais
```

## 🎨 Design

A aplicação utiliza um design moderno e clean com:

- Gradientes suaves (azul → roxo)
- Cards com sombras e efeitos hover
- Cores vibrantes e acessíveis
- Layout responsivo para mobile e desktop
- Animações fluidas

## 🔌 Integração com API

O hook `useAPI` gerencia todas as chamadas para a API backend:

- **GET** - Buscar todos os itens
- **POST** - Criar novo item
- **PUT** - Atualizar item existente
- **DELETE** - Remover item

### Endpoints da API

**Pacientes:**
- `GET /pacientes` - Listar todos os pacientes
- `POST /pacientes` - Criar novo paciente
- `PUT /pacientes/:id` - Atualizar paciente
- `DELETE /pacientes/:id` - Deletar paciente

**Médicos:**
- `GET /medicos` - Listar todos os médicos
- `POST /medicos` - Criar novo médico
- `PUT /medicos/:id` - Atualizar médico
- `DELETE /medicos/:id` - Deletar médico

## ⚙️ Configuração

### URL da API

Para alterar a URL base da API, edite o arquivo `src/hooks/useAPI.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000' // Alterar aqui se necessário
```

## 📝 Dados dos Formulários

### Pacientes

- Nome (obrigatório)
- CPF (obrigatório)
- Data de Nascimento (obrigatório)
- Plano de Saúde (obrigatório)

### Médicos

- Nome (obrigatório)
- CPF (obrigatório)
- CRM - Conselho Regional de Medicina (obrigatório)
- Data de Nascimento (obrigatório)
- Plano de Saúde (obrigatório)

## 🎯 Operações de CRUD

### Criar
Clique no botão "+ Adicionar Novo [Paciente/Médico]" para abrir o formulário

### Ler
Os dados aparecem automaticamente em cards na página principal

### Atualizar
Clique no botão "Editar" do card para editar um item

### Deletar
Clique no botão "Deletar" do card para remover um item (com confirmação)

## 🐛 Troubleshooting

### A API não carrega dados
- Verifique se o back-end está rodando em `http://localhost:3000`
- Verifique se há erros de CORS no console
- Verifique a conexão com o banco de dados do back-end

### Erro ao salvar dados
- Valide os dados do formulário
- Verifique os erros retornados pela API
- Verifique se o back-end está respondendo corretamente

## 📄 Licença

MIT

---

**Feito com ❤️ para FalaDoutor**
