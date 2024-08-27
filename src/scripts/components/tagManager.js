// tagManager.js
import { selectedTags, updateRecetteCourante, ToutesRecettes , RecetteFiltrees, AfficheListeDeroulanteFiltre, resetRecetteFiltrees } from '../page/main.js';
import { combinedFilter } from '../utils/combinedFilter.js';

// Fonction pour ajouter un tag
export const addTag = (tag, type) => {    
    if (!selectedTags[type].includes(tag)) {
        selectedTags[type].push(tag);
        renderTags();
        filterRecettes();
    } 
};

// Fonction pour supprimer un tag
export const removeTag = (tag, type) => {    
    // Trouve l'index du tag dans le tableau correspondant au type
    const index = selectedTags[type].indexOf(tag);

    // Si le tag est trouvé dans le tableau (index différent de -1)
    if (index > -1) {
        // Supprime le tag du tableau en utilisant splice
        selectedTags[type].splice(index, 1);

        // Met à jour l'affichage des tags
        renderTags();

        // Filtre les recettes en fonction des tags mis à jour
        filterRecettes();

        // Vérifier si tous les tags sont supprimés
        if (Object.values(selectedTags).every(tags => tags.length === 0)) {
            // Réinitialiser le champ de recherche principal
            const searchInput = document.getElementById('chercheRecette');
            if (searchInput) {
                searchInput.value = '';
                const clearSearchButton = document.getElementById('clearSearchInput');
                clearSearchButton.classList.add('hidden');
            }
        }        
    }     
};

// Fonction de suppression de tous les tags si le boutton supprimé de la barre de recherche est cliqué
export const resetTags = () => {
    for (const type in selectedTags) {
        selectedTags[type] = [];
    }
    renderTags();
    filterRecettes();
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
                <span class="tag-text" aria-label="Tag ${tag}">${tag}</span>
                <button class="ml-2 text-black hover:text-white" aria-label="Remove tag ${tag}">
                    <span class="fas fa-times" aria-hidden="true"></span>
                </button>
            `;
            tagElement.addEventListener('click', () => removeTag(tag, type));
            tagSection.appendChild(tagElement);
        });
    }
};

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
const filterRecettes = () => {
    // Si aucun tag n'est sélectionné, affiche toutes les recettes
    if (Object.values(selectedTags).every(tags => tags.length === 0)) {
        // Mise à jour des recettes affichées avec toutes les recettes disponibles
        resetRecetteFiltrees();//Réinitialise les recettes filtrèes
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes); // Mise à jour des listes déroulantes
        return; // Sortie de la fonction car aucune filtration n'est nécessaire
    }

    // Utilisation de la fonction combinée de recherche pour filtrer les recettes
    const filteredRecettes = combinedFilter(selectedTags, RecetteFiltrees);

    // Mise à jour des recettes affichées avec les recettes filtrées
    updateRecetteCourante(filteredRecettes);
    AfficheListeDeroulanteFiltre(filteredRecettes); // Mise à jour des listes déroulantes
};
