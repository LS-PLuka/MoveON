require('dotenv').config();
const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuario');
const postagemRoutes = require('./routes/postagem');
const comentarioRoutes = require('./routes/comentario');
const curtidaRoutes = require('./routes/curtida');
const seguidorRoutes = require('./routes/seguidor');

app.use(express.json());

app.use('/usuario', usuarioRoutes);
app.use('/postagem', postagemRoutes);
app.use('/comentario', comentarioRoutes);
app.use('/curtida', curtidaRoutes);
app.use('/seguidor', seguidorRoutes);

app.get('/', (req, res) => {
    res.send('API Rede Social para Atletas está rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});