/**
 * 
 * @param {HTMLElement} inputElement - L'élément de recherche (input).
 * @param {HTMLElement} clearButton - Le bouton de suppression.
 */
export function toggleDeleteBtn(inputElement, clearButton) {
    if (inputElement.value.length > 0) {
        clearButton.classList.remove('hidden');
    } else {
        clearButton.classList.add('hidden');
    }
}