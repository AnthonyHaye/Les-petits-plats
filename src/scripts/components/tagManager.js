import { selectedTags, updateRecetteCourante, ToutesRecettes } from '../page/main.js';

export const addTag = tag => {
    if (!selectedTags.includes(tag)) {
        selectedTags.push(tag);
        renderTags();
        filterRecettes();
    }
};

export const removeTag = tag => {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
        selectedTags.splice(index, 1);
        renderTags();
        filterRecettes();
    }
};

const renderTags = () => {
    const tagSection = document.querySelector('.tag_section');
    tagSection.innerHTML = '';
    selectedTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag w-48 h-12 flex items-center justify-between p-2 m-1 bg-jaune rounded-lg';
        tagElement.innerHTML = `
            <span class="tag-text">${tag}</span>
            <button class="ml-2 text-black hover:text-white">
                <span class="fas fa-times"></span>
            </button>
        `;
        tagElement.addEventListener('click', () => removeTag(tag));
        tagSection.appendChild(tagElement);
    });
};

// Cette fonction filtre les recettes en fonction des tags sélectionnés
const filterRecettes = () => {
    // Si aucun tag n'est sélectionné, affiche toutes les recettes
    if (selectedTags.length === 0) {
        // Mise à jour des recettes affichées avec toutes les recettes disponibles
        updateRecetteCourante(ToutesRecettes);
        return; // Sortie de la fonction car aucune filtration n'est nécessaire
    }

    // Filtrage des recettes en fonction des tags sélectionnés
    const filteredRecettes = ToutesRecettes.filter(recette =>
        // Vérifie que chaque tag sélectionné est présent dans les ingrédients de la recette
        selectedTags.every(tag =>
            // Vérifie si un ingrédient de la recette contient le tag (insensible à la casse)
            recette.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
            )
        )
    );

    // Mise à jour des recettes affichées avec les recettes filtrées
    updateRecetteCourante(filteredRecettes);
};

