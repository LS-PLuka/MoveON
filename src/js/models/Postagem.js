const pool = require('../config/database');

module.exports = {
    async create(conteudo, usuarioId) {
        sql = 'INSERT INTO Postagem (conteudo, usuarioId) VALUES (?, ?)';
        return pool.execute(sql, [conteudo, usuarioId]);
    },
    async findAll() {
        const sql = 'SELECT * FROM Postagem';
        [rows] = await pool.execute(sql);
        return rows;
    },
    async findById(id) {
        const sql = 'SELECT * FROM Postagem WHERE id = ?';
        const [rows] = await pool.execute(sql, [id]);
        return rows[0];
    }
};