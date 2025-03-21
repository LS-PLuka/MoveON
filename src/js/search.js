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

// Curtida
document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function() {
        const likeCount = this.nextElementSibling;
        let count = parseInt(likeCount.textContent);
        count++;
        likeCount.textContent = count;
    });
});
