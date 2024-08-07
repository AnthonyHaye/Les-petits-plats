// Ajout de la fonctionnalité de suppression pour l'input de recherche dans le header
const searchInput = document.getElementById('chercheRecette');
const clearSearchButton = document.getElementById('clearSearchInput');

// Vérifie si les éléments de recherche et de suppression existent dans le DOM
if (searchInput && clearSearchButton) {
    console.log("Les éléments ont été trouvés !");

    // Ajoute un écouteur d'événement 'input' sur l'élément de recherche
    searchInput.addEventListener('input', () => {
        // Appelle la fonction toggleDeleteBtn pour afficher ou cacher le bouton de suppression
        toggleDeleteBtn(searchInput, clearSearchButton);

        // Appelle la fonction RecherchePrincipal avec la valeur actuelle de l'input
        RecherchePrincipal(searchInput.value); // Exécute la fonction de recherche
    });

    // Ajoute un écouteur d'événement 'click' sur le bouton de suppression
    clearSearchButton.addEventListener('click', () => {
        // Réinitialise la valeur de l'input de recherche
        searchInput.value = '';

        // Ajoute la classe 'hidden' pour cacher le bouton de suppression
        clearSearchButton.classList.add('hidden');

        // Réinitialise tous les tags
        resetTags();

        // Réinitialise les recettes filtrées
        resetRecetteFiltrees(); 

        // Met à jour les recettes courantes avec toutes les recettes
        updateRecetteCourante(ToutesRecettes);

        // Met à jour les listes déroulantes avec toutes les recettes
        AfficheListeDeroulanteFiltre(ToutesRecettes); // Réinitialise les listes déroulantes
    });
} else {
    // Log une erreur si les éléments de recherche ou de suppression ne sont pas trouvés dans le DOM
    console.error('Les éléments #chercheRecette ou #clearSearchInput sont introuvables.');
}
