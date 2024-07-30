import { selectedTags, updateRecetteCourante, ToutesRecettes, AfficheListeDeroulanteFiltre } from '../page/main.js';
import { filterRecettesByTagsIngredient } from '../utils/ingredientFilter.js';
import {filterRecettesByTagsAppareil } from '../utils/appareilFilter.js';
import { filterRecettesByTagsUstensile } from '../utils/ustensileFilter.js';
import { combinedFilter } from '../utils/combinedFilter.js';

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
        AfficheListeDeroulanteFiltre(ToutesRecettes); // Mise à jour des listes déroulantes
        return; // Sortie de la fonction car aucune filtration n'est nécessaire
    }

    // // Filtrer par ingrédients
    // let filteredRecettes = filterRecettesByTagsIngredient(selectedTags, ToutesRecettes);
    
    // // Filtrer par appareils
    // filteredRecettes = filterRecettesByTagsAppareil(selectedTags, filteredRecettes);

    // // Mise à jour des recettes affichées avec les recettes filtrées
    // updateRecetteCourante(filteredRecettes);
    // AfficheListeDeroulanteFiltre(filteredRecettes); // Mise à jour des listes déroulantes



    // Utilisation de la nouvelle fonction de recherche pour filtrer les recettes
    const filteredRecettes = combinedFilter(selectedTags, ToutesRecettes);
    //const filteredRecettes = filterRecettesByTagsUstensile(selectedTags, ToutesRecettes);
//    const filteredRecettes = filterRecettesByTagsIngredient(selectedTags, ToutesRecettes);
    //const filteredRecettes = filterRecettesByTagsAppareil(selectedTags, ToutesRecettes);
    

    // Mise à jour des recettes affichées avec les recettes filtrées
    updateRecetteCourante(filteredRecettes);
    AfficheListeDeroulanteFiltre(filteredRecettes); // Mise à jour des listes déroulantes
    
};


