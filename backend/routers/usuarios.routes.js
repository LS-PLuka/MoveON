import express from 'express';
import multer from 'multer';
import CadastroController from '../controllers/cadastro.controller.js';

const router = express.Router();

// Configuração do multer para uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // pasta onde as imagens ficarão
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Rota para criar novo usuário (com upload de imagem)
router.post('/', upload.single('imagem'), CadastroController.criarUsuario);

// Outras rotas (ajuste para usar seu model corretamente)
import Usuarios from '../models/usuarios.js';

// Buscar todos os usuários
router.get('/', async (req, res) => {
    const todosUsuarios = await Usuarios.buscarTodos();
    res.json(todosUsuarios);
});

// Buscar usuário por ID
router.get('/:id', async (req, res) => {
    const usuario = await Usuarios.buscarPorId(parseInt(req.params.id));
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
    const resultado = await Usuarios.deletar(parseInt(req.params.id));
    if (resultado > 0) {
        res.status(204).send(); // No Content
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

export default router;
