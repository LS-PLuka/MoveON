import express from 'express';
import fs from 'fs';
import path from 'path';

// Importações das rotas
import usuariosRoutes from './backend/routers/usuariosRoutes.js';
import postagensRoutes from './backend/routers/postagensRoutes.js';
import curtidasRoutes from './backend/routers/curtidasRoutes.js';
import comentariosRoutes from './backend/routers/comentariosRoutes.js';
import seguidoresRoutes from './backend/routers/seguidoresRoutes.js';
import notificacoesRoutes from './backend/routers/notificacoesRoutes.js';
import mensagensRoutes from './backend/routers/mensagensRoutes.js';
import atividadesRoutes from './backend/routers/atividadesRoutes.js';
import usuarioAtividadesRoutes from './backend/routers/usuarioAtividadesRoutes.js';

// Importar cors
import cors from 'cors';

const app = express();
const PORT = 3000;

// Garantir que a pasta 'public/uploads' exista
const uploadDir = path.resolve('public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Pasta public/uploads criada com sucesso!');
}

// Middleware para ler JSON
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/postagens', postagensRoutes);
app.use('/api/curtidas', curtidasRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/seguidores', seguidoresRoutes);
app.use('/api/notificacoes', notificacoesRoutes);
app.use('/api/mensagens', mensagensRoutes);
app.use('/api/atividades', atividadesRoutes);
app.use('/api/usuario-atividades', usuarioAtividadesRoutes);

// Tornar 'public' acessível como estático (para servir imagens)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
