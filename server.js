import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

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
import amigosRoutes from './backend/routers/amigosRoutes.js';

const app = express();
const PORT = 3000;

// Cria a pasta para uploads se não existir
const uploadDir = path.resolve('public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Pasta public/uploads criada com sucesso!');
}

// Configuração CORS para liberar apenas origens específicas
const allowedOrigins = ['http://127.0.0.1:5500'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política de CORS não permite esta origem.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

// Definição das rotas da API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/postagens', postagensRoutes);
app.use('/api/curtidas', curtidasRoutes);
app.use('/api/postagens', comentariosRoutes);
app.use('/api/seguidores', seguidoresRoutes);
app.use('/api/notificacoes', notificacoesRoutes);
app.use('/api/mensagens', mensagensRoutes);
app.use('/api/atividades', atividadesRoutes);
app.use('/api/usuario-atividades', usuarioAtividadesRoutes);
app.use('/api/amigos', amigosRoutes);

// Servir arquivos estáticos da pasta 'public' (imagens, etc)
app.use(express.static('public'));

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
