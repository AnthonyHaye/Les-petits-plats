// ingredientFilter.js
import { filterRecettes } from "../scripts/components/RecetteCard";
import { addTag } from "../scripts/components/tag";

// Fonction pour initialiser le filtre de recherche par ingrédients
export function initialiseIngredientFilter() {
    // Sélectionne tous les éléments de la liste déroulante des ingrédients
    const ingredientItems = document.querySelectorAll('.dropdown_content_list li');

    // Ajoute un écouteur de clic à chaque élément de la liste déroulante
    ingredientItems.forEach(item => {
        item.addEventListener('click', () => {
            const ingredient = item.textContent;
            addTag(ingredient); // Ajoute l'ingrédient en tant qu'étiquette
            filterRecettes(); // Filtre les recettes en fonction des étiquettes sélectionnées
        });
    });
}

