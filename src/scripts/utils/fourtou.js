const searchInput = document.getElementById('chercheRecette');
const clearSearchButton = document.getElementById('clearSearchInput');

if (searchInput && clearSearchButton) {
    console.log("Les éléments ont été trouvés !");
    searchInput.addEventListener('input', () => {
        toggleDeleteBtn(searchInput, clearSearchButton);
        searchRecettes(searchInput.value); // Appeler la fonction de recherche ici
    });

    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchButton.classList.add('hidden');
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes); // Remettre à jour les listes déroulantes
    });
} else {
    console.error('Les éléments #chercheRecette ou #clearSearchInput sont introuvables.');
}
