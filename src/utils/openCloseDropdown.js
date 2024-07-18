// Déclare et exporte une fonction appelée openCloseDropdown
export const openCloseDropdown = () => {
    // Sélectionne tous les éléments avec la classe 'dropdown_btn' et les stocke dans dropdownButtons
    const dropdownButtons = document.querySelectorAll('.dropdown_btn');
    let chevron;

    // Fonction pour ouvrir/fermer le dropdown
    function toggleDropdown(btn) {
        // Sélectionne l'élément parent avec la classe 'dropdown-header' du bouton cliqué
        const dropdownHeader = btn.closest('.dropdown-header');
        // Sélectionne l'élément avec la classe 'dropdown-title' à l'intérieur du header
        const dropdownTitle = dropdownHeader.querySelector('.dropdown-title');
        // Sélectionne l'élément suivant immédiatement après 'dropdown-header'
        const dropdownContent = dropdownHeader.nextElementSibling;
        // Sélectionne l'icône chevron à l'intérieur du bouton cliqué
        chevron = btn.querySelector('.fa-chevron-down');
        // Bascule la classe 'rotate-180' pour faire tourner l'icône chevron de 180 degrés
        chevron.classList.toggle('rotate-180');
        // Bascule la classe 'hidden' pour afficher/masquer le contenu du dropdown
        dropdownContent.classList.toggle('hidden');
        // Bascule la classe 'bg-jaune' pour changer le fond du header
        dropdownHeader.classList.toggle('bg-jaune');
        // Bascule la classe 'hover:bg-jaune' pour désactiver le hover quand actif
        dropdownHeader.classList.toggle('hover:bg-jaune');
    };

    // Fonction pour fermer les autres dropdowns lorsque l'un d'entre eux est cliqué
    function closeOtherDropdowns(clickedButton) {
        // Parcourt tous les boutons de dropdown
        dropdownButtons.forEach(btn => {
            // Sélectionne l'icône chevron à l'intérieur de chaque bouton
            chevron = btn.querySelector('.fa-chevron-down');
            // Sélectionne l'élément parent avec la classe 'dropdown-header' du bouton
            const dropdownHeader = btn.closest('.dropdown-header');
            // Si le bouton n'est pas celui cliqué
            if (btn !== clickedButton) {
                // Supprime la classe 'rotate-180' pour remettre l'icône chevron à sa position initiale
                chevron.classList.remove('rotate-180');
                // Ajoute la classe 'hidden' pour masquer le contenu du dropdown
                dropdownHeader.nextElementSibling.classList.add('hidden');
                // Supprime la classe 'bg-jaune' pour réinitialiser le fond du header
                dropdownHeader.classList.remove('bg-white');
                // Ajoute la classe 'hover:bg-jaune' pour réactiver le hover quand inactif
                dropdownHeader.classList.add('hover:bg-jaune');
            }
        });
    };

    // Fonction pour gérer les éléments focusables dans le dropdown
    function focusableElements(btn) {
        // Sélectionne l'élément suivant immédiatement après 'dropdown-header' du bouton cliqué
        const dropdownContent = btn.closest('.dropdown-header').nextElementSibling;
        // Sélectionne tous les éléments focusables (input, button, li) à l'intérieur du contenu du dropdown
        const focusableElements = dropdownContent.querySelectorAll('input, button, li');

        // Si le contenu du dropdown est masqué, définit 'tabindex' à -1 pour rendre les éléments non focusables
        // Sinon, définit 'tabindex' à 0 pour rendre les éléments focusables
        dropdownContent.classList.contains('hidden') ? 
        focusableElements.forEach(element => element.setAttribute('tabindex', '-1')) : 
        focusableElements.forEach(element => element.setAttribute('tabindex', '0'));
    };

    // Ajoute un écouteur d'événement 'click' à chaque bouton de dropdown
    dropdownButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Ouvre/ferme le dropdown correspondant
            toggleDropdown(btn);
            // Ferme les autres dropdowns
            closeOtherDropdowns(btn);
            // Gère les éléments focusables
            focusableElements(btn);
        });
    });
};
