# MoveON

Rede social voltada para atividades físicas — compartilhe treinos, interaja com amigos e acompanhe sua comunidade em tempo real.

---

## Sobre

MoveON é uma plataforma social onde usuários podem registrar e compartilhar atividades físicas, seguir outros atletas, trocar mensagens e participar de comunidades temáticas.

## Funcionalidades

- Cadastro, login e perfil de usuário
- Postagens com texto e imagens
- Curtidas, comentários e sistema de seguidores
- Mensagens diretas em tempo real
- Feed com atualizações ao vivo
- Notificações
- Comunidades temáticas *(seção estática)*

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js (ES Modules), Express |
| Banco de dados | MySQL, Sequelize |
| Infra/Dev | Nodemon, Sucrase, ESLint, dotenv |

## Como rodar o projeto
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/moveon.git
cd moveon

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrations
npx sequelize db:migrate

# Inicie o servidor
npm run dev
```

## Equipe

| Membro | Área |
|---|---|
| Pedro Luka | Design, Frontend, Backend, Banco de dados |
| Pedro Meira | Design, Frontend |
| Thiago Godoy | Design, Frontend |
| Gabriel Muniz | Design |
| Pablo | Design |

## Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](./LICENSE) para mais detalhes.
