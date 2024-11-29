const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const http = require('http');

// Importação de rotas do backend
const cadastroRoutes = require('./routes/cadastroRoute');

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
    origin: ['http://localhost', 'http://localhost:3001', 'http://34.224.187.147'],
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

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Backend funcionando!');
  });
  