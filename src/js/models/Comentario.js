const pool = require('../config/database');

module.exports = {
    async create(conteudo, postagemId, usuarioId) {
        const sql = 'INSERT INTO Comentario (conteudo, postagemId, usuarioId) VALUES (?, ?, ?)';
        return pool.execute(sql, [conteudo, postagemId, usuarioId]);
    },
    async findByPostagem(postagemId) {
        const sql = 'SELECT * FROM Comentario WHERE postagemId = ?';
        const [rows] = await pool.execute(sql, [postagemId]);
        return rows;
    }
};