import Usuarios from '../models/usuarios.js';

const CadastroController = {
    criarUsuario: async (req, res) => {
        const { nome, usuario, email, senha, bio } = req.body;

        try {
            const novoUsuarioId = await Usuarios.criar({ nome, usuario, email, senha, bio });
            res.status(201).json({ id: novoUsuarioId });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

export default CadastroController;
