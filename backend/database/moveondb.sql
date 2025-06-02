-- Banco de Dados MoveOn
-- Autor: Pedro Luka (Backend Developer)

-- Criação do Banco de Dados
DROP DATABASE IF EXISTS moveon;
CREATE DATABASE IF NOT EXISTS moveon;
USE moveon;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Postagens
CREATE TABLE postagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    imagem VARCHAR(255), -- novo campo para a imagem (URL ou nome do arquivo)
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Curtidas
CREATE TABLE curtidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    postagem_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, postagem_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (postagem_id) REFERENCES postagens(id) ON DELETE CASCADE
);

-- Tabela de Comentários
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    postagem_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (postagem_id) REFERENCES postagens(id) ON DELETE CASCADE
);

-- Tabela de Seguidores
CREATE TABLE seguidores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seguidor_id INT NOT NULL,
    seguido_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(seguidor_id, seguido_id),
    FOREIGN KEY (seguidor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (seguido_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Notificações
CREATE TABLE notificacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  remetente_id INT,
  tipo ENUM('comentario', 'curtida', 'mensagem', 'seguindo') NOT NULL,
  referencia_id INT NOT NULL,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  lida BOOLEAN DEFAULT FALSE,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (remetente_id) REFERENCES usuarios(id)
);

-- Tabela de Mensagens Diretas
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de Tags no Perfil
CREATE TABLE atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario_atividades (
    usuario_id INT NOT NULL,
    atividade_id INT NOT NULL,
    PRIMARY KEY (usuario_id, atividade_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE CASCADE
);

INSERT INTO atividades (nome) VALUES
('Futebol'),
('Basquete'),
('Vôlei'),
('Handebol'),
('Tênis'),
('Tênis de Mesa'),
('Academia'),
('Musculação'),
('Crossfit'),
('Pilates'),
('Yoga'),
('Alongamento'),
('Zumba'),
('Dança'),
('Ginástica'),
('Natação'),
('Hidroginástica'),
('Corrida'),
('Caminhada'),
('Ciclismo'),
('Spinning'),
('Escalada'),
('Boxe'),
('Muay Thai'),
('Karatê'),
('Jiu-Jitsu'),
('Capoeira'),
('Taekwondo'),
('Kickboxing'),
('Skate'),
('Patinação'),
('Remo'),
('Surfe'),
('Stand Up Paddle'),
('Canoagem'),
('Trilha'),
('Escalada Indoor'),
('Futebol Americano'),
('Beisebol'),
('Rugby'),
('Golfe'),
('Esgrima'),
('Badminton'),
('Slackline'),
('Parkour'),
('Marcha Atlética'),
('Arco e Flecha'),
('Atletismo'),
('Triatlo'),
('Escoteirismo');
