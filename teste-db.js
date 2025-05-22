// Teste de conexão com o Banco de Dados MySQL
import db from '../MoveON/backend/config/database.js';

async function testarConexao() {
  try {
    const [rows] = await db.execute('SELECT 1 + 1 AS resultado');
    console.log('Conexão bem-sucedida! Resultado:', rows[0].resultado);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
  }
}

testarConexao();
