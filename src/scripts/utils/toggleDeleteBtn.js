/**
 * Contrôle la visibilité du bouton de suppression en fonction de la valeur de l'élément de recherche.
 * 
 * @param {HTMLElement} inputElement - L'élément de recherche (input).
 * @param {HTMLElement} clearButton - Le bouton de suppression.
 */
export function toggleDeleteBtn(inputElement, clearButton) {
    // Vérifie si l'élément de recherche contient du texte
    if (inputElement.value.length > 0) {
        // Si oui, enlève la classe 'hidden' pour afficher le bouton de suppression
        clearButton.classList.remove('hidden');
    } else {
        // Sinon, ajoute la classe 'hidden' pour cacher le bouton de suppression
        clearButton.classList.add('hidden');
    }
}
