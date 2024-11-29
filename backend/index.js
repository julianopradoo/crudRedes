const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const http = require('http');

// Importação de rotas do backend
const cadastroRoutes = require('./routes/cadastroRoute');

// Função de inicialização do banco de dados
const initializeDatabase = require('./database/dbCreate');

// Configurações do servidor
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 200 // limite de 200 requisições por IP por janela de tempo
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './')));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors({
    origin: ['http://localhost', 'http://localhost:3001', 'http://34.224.187.147', 'http://127.0.0.1:5500'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));
app.set('view engine', 'ejs');

// Middleware para converter BigInt em string
app.use((req, res, next) => {
    const oldJson = res.json;
    res.json = function(data) {
        if (typeof data === 'object') {
            data = JSON.parse(JSON.stringify(data, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
        }
        oldJson.call(this, data);
    };
    next();
});

// Rotas do backend
app.use('/cadastro', cadastroRoutes);

// Inicialização do banco de dados e servidor
async function startServer() {
    try {
        console.log("Inicializando o banco de dados...");
        if (process.env.DBCREATE === 'true') {
          await initializeDatabase(); 
          console.log("Banco de dados inicializado com sucesso.");
        } else {
          console.log("Criação do banco de dados desabilitada.");
        }

        server.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (err) {
        console.error("Erro ao inicializar o banco de dados:", err);
        process.exit(1); // Encerra o processo em caso de falha
    }
}

startServer();

app.get('/', (req, res) => {
    res.send('Backend funcionando!');
});
