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

    // Masque le message de résultats nuls
    handleNoResultsMessage();

    // Met à jour les listes déroulantes avec toutes les recettes
    AfficheListeDeroulanteFiltre(ToutesRecettes); // Réinitialise les listes déroulantes
});
