import db from '../config/database.js';

const Atividades = {
  async listarTodas() {
    const [rows] = await db.execute('SELECT * FROM atividades ORDER BY nome');
    return rows;
  }
};

export default Atividades;
