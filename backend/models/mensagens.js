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
