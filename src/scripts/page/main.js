console.log('Bonjour Anthony Haye');
import Api from '../api/api.js';
import Recette from '../models/Recette.js';
import RecetteCard from '../components/RecetteCard.js';
import ListeDeroulante from '../components/listeDeroulante.js';
import { openCloseDropdown } from '../utils/openCloseDropdown.js';
import { extractLesMoyens } from '../utils/ExtractLesMoyens.js';
import { toggleDeleteBtn } from '../utils/toggleDeleteBtn.js';
import { filterRecettesByTagsIngredient } from '../utils/ingredientFilter.js';
import { filterRecettesByTagsAppareil } from '../utils/appareilFilter.js';
import { filterRecettesByTagsUstensile } from '../utils/ustensileFilter.js';
import { combinedFilter } from '../utils/combinedFilter.js';
import { addTag, removeTag  } from '../components/tagManager.js';
//import { RecherchePrincipal } from '../utils/RecherchePrincipal.js';

const recetteApi = new Api('src/data/recipes.json');
export const ToutesRecettes = await recetteApi.get();
console.log(ToutesRecettes);

// Copie du tableau de recettes pour pouvoir filtrer les recettes en cours
export const RecetteCourante = [...ToutesRecettes];

// Met à jour le tableau RecetteCourante pour qu'il contienne les mêmes éléments du tableau RecetteFiltre.
export const updateRecetteCourante = RecetteFiltre => {
    RecetteCourante.splice(0, RecetteCourante.length, ...RecetteFiltre);
    AfficheRecetteCards(); // Mettre à jour l'affichage des cartes de recettes
    updateNombreDeRecettes(); // Mettre à jour le nombre de recettes affichées
};

//  export const selectedTags = [];
export const selectedTags = {
    ingredients: [],
    appareils: [],
    ustensiles: []
};
export const ListeDeroulantes = [];
export const RecetteARechercher = document.querySelector('#chercheRecette');

export const AfficheListeDeroulanteFiltre = (recettes = ToutesRecettes) => {
    const nombreDeRecette = document.querySelector('.nbr_recette');
    nombreDeRecette.textContent = `${recettes.length} recettes`;

    const filterSection = document.querySelector('.contenairFiltre');
    filterSection.innerHTML = ''; // Effacer les anciennes listes déroulantes

    const ustensileListeDeroulante = new ListeDeroulante('Ustensiles', extractLesMoyens(recettes).ustensils, 'ustensiles');
    filterSection.appendChild(ustensileListeDeroulante.createListeDeroulante());
    ListeDeroulantes.push(ustensileListeDeroulante);        

    const appareilsListeDeroulante = new ListeDeroulante('Appareils', extractLesMoyens(recettes).appliances, 'appareils');
    filterSection.appendChild(appareilsListeDeroulante.createListeDeroulante());
    ListeDeroulantes.push(appareilsListeDeroulante);

    const ingredientListeDeroulante = new ListeDeroulante('Ingrédients', extractLesMoyens(recettes).ingredients, 'ingredients');
    filterSection.appendChild(ingredientListeDeroulante.createListeDeroulante());
    ListeDeroulantes.push(ingredientListeDeroulante);
    openCloseDropdown();
};


// export const AfficheListeDeroulanteFiltre = (recettes = ToutesRecettes) => {
//     const nombreDeRecette = document.querySelector('.nbr_recette');
//     nombreDeRecette.textContent = `${recettes.length} recettes`;

//     const filterSection = document.querySelector('.contenairFiltre');
//     filterSection.innerHTML = ''; // Effacer les anciennes listes déroulantes

//     const ustensileListeDeroulante = new ListeDeroulante('Ustensiles', extractLesMoyens(recettes).ustensils);
//     filterSection.appendChild(ustensileListeDeroulante.createListeDeroulante());
//     ListeDeroulantes.push(ustensileListeDeroulante);        

//     const appareilsListeDeroulante = new ListeDeroulante('Appareils', extractLesMoyens(recettes).appliances);
//     filterSection.appendChild(appareilsListeDeroulante.createListeDeroulante());
//     ListeDeroulantes.push(appareilsListeDeroulante);

//     const ingredientListeDeroulante = new ListeDeroulante('Ingrédients', extractLesMoyens(recettes).ingredients);
//     filterSection.appendChild(ingredientListeDeroulante.createListeDeroulante());
//     ListeDeroulantes.push(ingredientListeDeroulante);
//     openCloseDropdown();
// };

export const AfficheRecetteCards = () => {
    const cardSection = document.querySelector('.card_section');
    cardSection.innerHTML = ''; // Effacer les cartes existantes
    RecetteCourante
        .map(recette => new Recette(recette))
        .forEach(recette => {
            const templateCard = new RecetteCard(recette);
            templateCard.createCard();
        });
};

// Fonction pour mettre à jour le nombre de recettes affichées
const updateNombreDeRecettes = () => {
    const nombreDeRecette = document.querySelector('.nbr_recette');
    nombreDeRecette.textContent = `${RecetteCourante.length} recettes`;
};

// Ajout de la fonctionnalité de suppression pour l'input de recherche dans le header
const searchInput = document.getElementById('chercheRecette');
const clearSearchButton = document.getElementById('clearSearchInput');

const RecherchePrincipal = (MotRechercher) => {
    if (!MotRechercher || MotRechercher.length < 3) {
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes);
        return;
    }

    const lowerCaseQuery = MotRechercher.toLowerCase();
    let filteredRecettes = [];

    for (const recette of ToutesRecettes) {
        if (recette.name.toLowerCase().includes(lowerCaseQuery) ||
            recette.description.toLowerCase().includes(lowerCaseQuery)) {
            filteredRecettes.push(recette);
            continue;
        }
        
        for (const ingredient of recette.ingredients) {
            if (ingredient.ingredient.toLowerCase().includes(lowerCaseQuery)) {
                filteredRecettes.push(recette);
                break;
            }
        }
    }

    updateRecetteCourante(filteredRecettes);
    AfficheListeDeroulanteFiltre(filteredRecettes);
};

if (searchInput && clearSearchButton) {
    console.log("Les éléments ont été trouvés !");
    searchInput.addEventListener('input', () => {
        toggleDeleteBtn(searchInput, clearSearchButton);
        RecherchePrincipal(searchInput.value); // Appele la fonction de recherche 
    });

    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchButton.classList.add('hidden');
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes); // Remettre à jour les listes déroulantes
    });
} else {
    console.error('Les éléments #chercheRecette ou #clearSearchInput sont introuvables.');
}

// if (searchInput && clearSearchButton) { // Vérifie que les éléments ont été trouvés.
//     console.log("Les éléments ont été trouvés !");
//     searchInput.addEventListener('input', () => {
//         toggleDeleteBtn(searchInput, clearSearchButton);
//     });

//     clearSearchButton.addEventListener('click', () => {
//         searchInput.value = '';
//         clearSearchButton.classList.add('hidden');
//         // Ajoutez ici toute autre logique nécessaire lors de la suppression de la recherche, par exemple, réinitialiser les résultats de la recherche.
//     });
// } else {
//     console.error('Les éléments #chercheRecette ou #clearSearchInput sont introuvables.');
// }

AfficheListeDeroulanteFiltre();
AfficheRecetteCards();

