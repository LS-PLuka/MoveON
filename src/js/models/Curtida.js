const pool = require('../config/database');

module.exports = {
    async like(usuarioId, postagemId) {
        const sql = 'INSERT IGNORE INTO Curtida (usuarioId, postagemId) VALUES (?, ?)';
        return pool.execute(sql, [usuarioId, postagemId]);
    },
    async unlike(usuarioId, postagemId) {
        const sql = 'DELETE FROM Curtida WHERE usuarioId = ? AND postagemId = ?';
        return pool.execute(sql, [usuarioId, postagemId]);
    },
    async count(postagemId) {
        const sql = 'SELECT COUNT(*) as total FROM Curtida WHERE postagemId = ?';
        const [rows] = await pool.execute(sql, [postagemId]);
        return rows[0].total;
    }
};