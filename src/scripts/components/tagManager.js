// tagManager.js
import { selectedTags, updateRecetteCourante, ToutesRecettes } from '../page/main.js';
import { combinedFilter } from '../utils/combinedFilter.js';
import { AfficheListeDeroulanteFiltre } from '../page/main.js';

// Fonction pour ajouter un tag
export const addTag = (tag, type) => {
    console.log(`Adding tag: ${tag}, Type: ${type}`);
    
    if (!selectedTags[type].includes(tag)) {
        selectedTags[type].push(tag);
        renderTags();
        filterRecettes();
    } else {
        console.log(`Tag ${tag} already exists in ${type}`);
    }
};

// Fonction pour supprimer un tag
export const removeTag = (tag, type) => {
    console.log(`Removing tag: ${tag}, Type: ${type}`);
    
    const index = selectedTags[type].indexOf(tag);
    if (index > -1) {
        selectedTags[type].splice(index, 1);
        renderTags();
        filterRecettes();
    } else {
        console.log(`Tag ${tag} not found in ${type}`);
    }
};

// Fonction pour afficher les tags
const renderTags = () => {
    const tagSection = document.querySelector('.tag_section');
    tagSection.innerHTML = '';
    for (const type in selectedTags) {
        selectedTags[type].forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag w-48 h-12 flex items-center justify-between p-2 m-1 bg-jaune rounded-lg';
            tagElement.innerHTML = `
                <span class="tag-text">${tag}</span>
                <button class="ml-2 text-black hover:text-white">
                    <span class="fas fa-times"></span>
                </button>
            `;
            tagElement.addEventListener('click', () => removeTag(tag, type));
            tagSection.appendChild(tagElement);
        });
    }
};

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
const filterRecettes = () => {
    console.log('Filtering recipes with tags:', selectedTags);

    // Si aucun tag n'est sélectionné, affiche toutes les recettes
    if (Object.values(selectedTags).every(tags => tags.length === 0)) {
        // Mise à jour des recettes affichées avec toutes les recettes disponibles
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes); // Mise à jour des listes déroulantes
        return; // Sortie de la fonction car aucune filtration n'est nécessaire
    }

    // Utilisation de la fonction combinée de recherche pour filtrer les recettes
    const filteredRecettes = combinedFilter(selectedTags, ToutesRecettes);

    // Mise à jour des recettes affichées avec les recettes filtrées
    updateRecetteCourante(filteredRecettes);
    AfficheListeDeroulanteFiltre(filteredRecettes); // Mise à jour des listes déroulantes
};
