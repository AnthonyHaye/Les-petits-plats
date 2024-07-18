// main.js
console.log('Bonjour Anthony Haye');
import Api from '../api/api.js';
import Recette from '../models/Recette.js';
import RecetteCard from '../components/RecetteCard.js';
import ListeDeroulante from '../components/ListeDeroulante.js';
import { openCloseDropdown } from '../../utils/openCloseDropdown.js';
import { extractLesMoyens } from '../../utils/extractLesMoyens.js';
import { toggleDeleteBtn } from '../../utils/toggleDeleteBtn.js';

const recetteApi = new Api('./data/recipes.json');
export const ToutesRecettes = await recetteApi.get();
console.log(ToutesRecettes);

// Copie du tableau de recettes pour pouvoir filtrer les recettes en cours
export const RecetteCourante = [...ToutesRecettes];

// Met à jour le tableau RecetteCourante pour qu'il contienne les mêmes éléments du tableau RecetteFiltre.
export const updateRecetteCourante = RecetteFiltre => { 
    RecetteCourante.splice(0, RecetteCourante.length, ...RecetteFiltre);
};

export const selectedTags = [];
export const ListeDeroulantes = [];
export const RecetteARechercher = document.querySelector('#chercheRecette');

const AfficheListeDeroulanteFiltre = () => {
    const nombreDeRecette = document.querySelector('.nbr_recette');
    nombreDeRecette.textContent = `${ToutesRecettes.length} recettes`;

    const filterSection = document.querySelector('.filter_section');
    const ingredientListeDeroulante = new ListeDeroulante('Ingrédients', extractLesMoyens(ToutesRecettes).ingredients);
    filterSection.appendChild(ingredientListeDeroulante.createListeDeroulante());
    ListeDeroulantes.push(ingredientListeDeroulante);
};

export const AfficheRecetteCards = () => {
    ToutesRecettes
        .map(recette => new Recette(recette))
        .forEach(recette => {
            const templateCard = new RecetteCard(recette);
            templateCard.createCard();                        
        });
};

// Ajout de la fonctionnalité de suppression pour l'input de recherche dans le header
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('chercheRecette');
    const clearSearchButton = document.getElementById('clearSearchInput');

    searchInput.addEventListener('input', () => {
        toggleDeleteBtn(searchInput, clearSearchButton);
    });

    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchButton.classList.add('hidden');
        // Ajoutez ici toute autre logique nécessaire lors de la suppression de la recherche, par exemple, réinitialiser les résultats de la recherche.
    });
});

AfficheListeDeroulanteFiltre();
AfficheRecetteCards();
openCloseDropdown();
