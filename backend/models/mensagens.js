// models/mensagens.js
import db from '../config/database.js';

export async function enviarMensagem(remetente_id, destinatario_id, conteudo) {
  const sql = 'INSERT INTO mensagens (remetente_id, destinatario_id, conteudo) VALUES (?, ?, ?)';
  const [result] = await db.execute(sql, [remetente_id, destinatario_id, conteudo]);
  return result.insertId;
}

export async function buscarMensagensEntreUsuarios(usuario1, usuario2) {
  const sql = `
    SELECT * FROM mensagens
    WHERE (remetente_id = ? AND destinatario_id = ?)
       OR (remetente_id = ? AND destinatario_id = ?)
    ORDER BY criado_em ASC
  `;
  const [rows] = await db.execute(sql, [usuario1, usuario2, usuario2, usuario1]);
  return rows;
}

export async function editarMensagem(id, novoConteudo) {
  const sql = `UPDATE mensagens SET conteudo = ? WHERE id = ?`;
  const [result] = await db.execute(sql, [novoConteudo, id]);
  return result.affectedRows > 0;
}

export async function excluirMensagem(id) {
  const sql = `DELETE FROM mensagens WHERE id = ?`;
  const [result] = await db.execute(sql, [id]);
  return result.affectedRows > 0;
}
