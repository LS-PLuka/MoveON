// Barra de Pesquisa
function toggleSearchBar() {
  const searchBar = document.getElementById('searchBar');

  if (searchBar.classList.contains('show')) {
    searchBar.classList.remove('show');
    setTimeout(() => {
      searchBar.style.display = 'none';
    }, 500);
  } else {
    searchBar.style.display = 'flex';
    setTimeout(() => {
      searchBar.classList.add('show');
    }, 10);
  }
}

document.getElementById('searchInput').addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const termo = e.target.value.trim();
    if (!termo) return;

    try {
      const resposta = await fetch(`http://localhost:3000/api/usuarios/usuario/${termo}`);
      if (!resposta.ok) throw new Error('Usuário não encontrado');

      const usuario = await resposta.json();
      window.location.href = `src/perfil-amigo.html?id=${usuario.id}`;
    } catch (erro) {
      console.error('Erro ao buscar usuário:', erro);
      alert("Usuário não encontrado");
    }
  }
});

// Feed e Postagens
document.addEventListener('DOMContentLoaded', () => {
  const feedContainer = document.getElementById('feed-container');
  const usuarioId = localStorage.getItem("usuario_id");
  const nomeUsuario = localStorage.getItem("usuario_nome");

  if (!usuarioId) {
    alert("Usuário não está logado. Redirecionando para a página de login.");
    window.location.href = "src/entrar.html";
    return;
  }

  async function carregarFeed() {
    try {
      const resposta = await fetch(`http://localhost:3000/api/postagens/feed/${usuarioId}`, {
        credentials: 'include'
      });

      if (!resposta.ok) throw new Error('Erro ao carregar o feed');

      const posts = await resposta.json();
      feedContainer.innerHTML = '';

      for (const post of posts) {
        const postElement = await criarPostElement(post);
        feedContainer.appendChild(postElement);
      }
    } catch (erro) {
      console.error('Erro ao carregar o feed:', erro);
      feedContainer.innerHTML = '<p>Não foi possível carregar o feed.</p>';
    }
  }

  async function criarPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const curtidas = post.total_curtidas ?? 0;
    const nomeDoAutor = post.usuario?.nome || 'Usuário desconhecido';
    const idAutor = post.usuario?.id || '';

    postDiv.innerHTML = `
      <div class="post-header">
        <div class="user-icon">
          <a href="src/perfil-amigo.html?id=${idAutor}">
            <ion-icon name="person-circle-outline" class="user-icon"></ion-icon>
          </a>
        </div>
        <div class="user-info">
          <span class="username">${nomeDoAutor}</span>
          <span class="post-date">Publicado em ${new Date(post.criado_em).toLocaleDateString()}</span>
        </div>
      </div>

      ${post.imagem ? `<img src="http://localhost:3000/uploads/${post.imagem}" alt="Imagem do Post">` : ''}

      <div class="post-content">${post.conteudo || ''}</div>

      <div class="post-actions">
        <button class="like-button" data-post-id="${post.id}">
          <div class="label">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.4 5.25C5.61914 5.25 3.25 7.3293 3.25 10.0298C3.25 11.8927 4.12235 13.4612 5.27849 14.7604C6.43066 16.0552 7.91714 17.142 9.26097 18.0516L11.5796 19.6211C11.8335 19.793 12.1665 19.793 12.4204 19.6211L14.739 18.0516C16.0829 17.142 17.5693 16.0552 18.7215 14.7604C19.8777 13.4612 20.75 11.8927 20.75 10.0298C20.75 7.3293 18.3809 5.25 15.6 5.25C14.1665 5.25 12.9052 5.92214 12 6.79183C11.0948 5.92214 9.83347 5.25 8.4 5.25Z" fill="black"/>
            </svg>
            Curtir
          </div>
          <div class="like-number">${curtidas}</div>
        </button>
        <button class="coment-button">Comentar</button>
      </div>

      <div class="comments-section">
        <div class="comments-list">Carregando comentários...</div>
        <form class="comment-form" data-post-id="${post.id}">
          <input type="text" placeholder="Adicione um comentário..." required />
          <button type="submit"><ion-icon name="send-outline"></ion-icon></button>
        </form>
      </div>
    `;

    // Curtir Postagem
    const likeBtn = postDiv.querySelector('.like-button');
    likeBtn.addEventListener('click', async () => {
      try {
        const postagem_id = likeBtn.getAttribute('data-post-id');
        const resposta = await fetch(`http://localhost:3000/api/curtidas/toggle/${postagem_id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id: usuarioId }),
        });

        const dados = await resposta.json();
        if (resposta.ok) {
          const numeroCurtidas = likeBtn.querySelector('.like-number');
          const atual = parseInt(numeroCurtidas.textContent);
          const foiCurtido = dados.mensagem === "Postagem curtida";

          numeroCurtidas.textContent = foiCurtido ? atual + 1 : atual - 1;

          const autorPost = post.usuario?.id;
          if (foiCurtido && autorPost && autorPost !== parseInt(usuarioId)) {
            await fetch('http://localhost:3000/api/notificacoes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                usuario_id: autorPost,
                tipo: 'curtida',
                referencia_id: postagem_id,
                remetente_id: usuarioId
              })
            });
          }
        } else {
          alert(dados.erro || 'Erro ao curtir postagem');
        }
      } catch (erro) {
        console.error('Erro ao curtir:', erro);
        alert('Erro ao curtir postagem');
      }
    });

    // Comentar Postagem
    const commentButton = postDiv.querySelector('.coment-button');
    const commentsSection = postDiv.querySelector('.comments-section');
    commentButton.addEventListener('click', () => {
      commentsSection.classList.toggle('show');
    });

    const commentForm = postDiv.querySelector('.comment-form');
    const commentsList = postDiv.querySelector('.comments-list');
    const postId = post.id;

    async function carregarComentarios() {
      try {
        const resposta = await fetch(`http://localhost:3000/api/postagens/${postId}/comentarios`);
        const comentarios = await resposta.json();

        commentsList.innerHTML = '';
        if (comentarios.length === 0) {
          commentsList.innerHTML = '<p>Seja o primeiro a comentar!</p>';
        } else {
          comentarios.forEach(c => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<span class="comment-user">${c.nome_usuario}:</span> <span class="comment-text">${c.conteudo}</span>`;
            commentsList.appendChild(commentDiv);
          });
        }
      } catch (erro) {
        commentsList.innerHTML = '<p>Erro ao carregar comentários.</p>';
        console.error('Erro ao buscar comentários:', erro);
      }
    }

    await carregarComentarios();

    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = commentForm.querySelector('input');
      const texto = input.value.trim();
      if (!texto) return;

      try {
        // Enviar comentário
        const resposta = await fetch(`http://localhost:3000/api/postagens/${postId}/comentarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id: usuarioId, conteudo: texto }),
        });

        if (!resposta.ok) throw new Error('Erro ao comentar no post');

        await carregarComentarios();
        input.value = '';

        // Enviar notificação
        const donoPostId = post.usuario?.id;
        if (donoPostId && donoPostId !== usuarioId) {
          await fetch('http://localhost:3000/api/notificacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usuario_id: donoPostId,
              tipo: 'comentario',
              referencia_id: postId,
              remetente_id: usuarioId,
            }),
          });
        }        

      } catch (erro) {
        console.error('Erro ao comentar:', erro);
        alert('Erro ao enviar comentário');
      }
    });

    return postDiv;
  }

  carregarFeed();
});
