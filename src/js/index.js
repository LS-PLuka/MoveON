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
    };
};

// Botão de Like
const buttons = document.querySelectorAll('.like-button');

buttons.forEach((button) => {
  const number = button.querySelector('.like-number'); 

  button.addEventListener('click', () => {
    let likeValue = parseInt(number.textContent, 10) || 0;
    let isLiked = button.classList.contains('like');

    if (isLiked) {
      button.classList.remove('like');
      number.textContent = likeValue - 1;
    } else {
      button.classList.add('like');
      number.textContent = likeValue + 1;
    }
  });
});
