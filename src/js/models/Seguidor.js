const pool = require('../config/database');

module.exports = {
    async follow(seguidorId, seguidoId) {
        const sql = 'INSERT IGNORE INTO Seguidor (seguidorId, seguidoId) VALUES (?, ?)';
        return pool.execute(sql, [seguidorId, seguidoId]);
    },
    async unfollow(seguidorId, seguidoId) {
        const sql = 'DELETE FROM Seguidor WHERE seguidorId = ? AND seguidoId = ?';
        return pool.execute(sql, [seguidorId, seguidoId]);
    },
    async seguidores(usuarioId) {
        const sql = 'SELECT * FROM Seguidor WHERE seguidoId = ?';
        const [rows] = await pool.execute(sql, [usuarioId]);
        return rows;
    },
    async seguindo(usuarioId) {
        const sql = 'SELECT * FROM Seguidor WHERE seguidorId = ?';
        const [rows] = await pool.execute(sql, [usuarioId]);
        return rows;
    }
};