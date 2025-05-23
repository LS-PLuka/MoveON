import { listarAtividades } from '../models/atividades.js';

export async function getAtividades(req, res) {
  try {
    const atividades = await listarAtividades();
    res.status(200).json(atividades);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar atividades: ' + error.message });
  }
}
