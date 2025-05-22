const pool = require('../config/database');

module.exports = {
        async create(nome, usuario, senha) {
        const sql = 'INSERT INTO Usuario (nome, usuario, senha) VALUES (?, ?, ?)';
        return pool.execute(sql, [nome, usuario, senha]);
    },
        async findByUsuario(usuario) {
        const sql = 'SELECT * FROM Usuario WHERE usuario = ?';
        const [rows] = await pool.execute(sql, [usuario]);
        return rows[0];
    },
    async findById(id) {
        const sql = 'SELECT * FROM Usuario WHERE id = ?';
        const [rows] = await pool.execute(sql, [id]);
        return rows[0];
    }
};