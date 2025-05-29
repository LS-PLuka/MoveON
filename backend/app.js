import express from 'express';
import usuariosRouter from '../backend/routers/usuarios.routes.js';

const app = express();

app.use(express.json());

app.use('/usuarios', usuariosRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
