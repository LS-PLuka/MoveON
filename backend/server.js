import express from 'express';
import bodyParser from 'body-parser';
import usuariosRoutes from '../backend/routers/usuarios.routes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api/usuarios', usuariosRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
