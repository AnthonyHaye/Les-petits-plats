import Api from '../api/api.js';
import Recette from '../models/Recette.js';
import RecetteCard from '../components/RecetteCard.js';
import ListeDeroulante from '../components/listeDeroulante.js';
import { openCloseDropdown } from '../utils/openCloseDropdown.js';
import { extractLesMoyens } from '../utils/extractLesMoyens.js';
import { toggleDeleteBtn } from '../utils/toggleDeleteBtn.js';
import { AlgoRechercheBoucle, AlgoRechercheFonctionnel } from '../utils/AlgoRecherche.js';
import { addTag, removeTag } from '../components/tagManager.js';

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

export const selectedTags = [];
export const ListeDeroulantes = [];
export const RecetteARechercher = document.querySelector('#chercheRecette');

// Modifiez cette fonction pour accepter un paramètre `recettes`
export const AfficheListeDeroulanteFiltre = (recettes = ToutesRecettes) => {
    const nombreDeRecette = document.querySelector('.nbr_recette');
    nombreDeRecette.textContent = `${recettes.length} recettes`;

    const filterSection = document.querySelector('.contenairFiltre');
    filterSection.innerHTML = ''; // Efface les anciennes listes déroulantes

    const ustensileListeDeroulante = new ListeDeroulante('Ustensiles', extractLesMoyens(recettes).ustensils);
    filterSection.appendChild(ustensileListeDeroulante.createListeDeroulante());
    ListeDeroulantes.push(ustensileListeDeroulante);        

    const appareilsListeDeroulante = new ListeDeroulante('Appareils', extractLesMoyens(recettes).appliances);
    filterSection.appendChild(appareilsListeDeroulante.createListeDeroulante());
    ListeDeroulantes.push(appareilsListeDeroulante);

    const ingredientListeDeroulante = new ListeDeroulante('Ingrédients', extractLesMoyens(recettes).ingredients);
    filterSection.appendChild(ingredientListeDeroulante.createListeDeroulante());
    ListeDeroulantes.push(ingredientListeDeroulante);
    console.log(ingredientListeDeroulante);
   openCloseDropdown();
};

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

if (searchInput && clearSearchButton) { // Vérifie que les éléments ont été trouvés.
    console.log("Les éléments ont été trouvés !");
    searchInput.addEventListener('input', () => {
        toggleDeleteBtn(searchInput, clearSearchButton);
    });

    clearSearchButton.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchButton.classList.add('hidden');
        // Ajoutez ici toute autre logique nécessaire lors de la suppression de la recherche, par exemple, réinitialiser les résultats de la recherche.
    });
} else {
    console.error('Les éléments #chercheRecette ou #clearSearchInput sont introuvables.');
}

AfficheListeDeroulanteFiltre();
AfficheRecetteCards();
