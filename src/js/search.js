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
