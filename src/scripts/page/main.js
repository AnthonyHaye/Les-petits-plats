import Api from '../api/api.js';
import Recette from '../models/Recette.js';
import RecetteCard from '../components/RecetteCard.js';
import ListeDeroulante from '../components/listeDeroulante.js';
import { openCloseDropdown } from '../utils/openCloseDropdown.js';
import { extractLesMoyens } from '../utils/ExtractLesMoyens.js';
import { toggleDeleteBtn } from '../utils/toggleDeleteBtn.js';
import { RecherchePrincipal, handleNoResultsMessage } from '../utils/RecherchePrincipal.js';
import { resetTags } from '../components/tagManager.js';

const recetteApi = new Api('src/data/recipes.json');
export const ToutesRecettes = await recetteApi.get();

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

export const RecetteFiltrees = [...ToutesRecettes]; // Ajoutez cette ligne

// Ajoutez cette fonction pour réinitialiser les recettes filtrées
export const resetRecetteFiltrees = () => {
    RecetteFiltrees.splice(0, RecetteFiltrees.length, ...ToutesRecettes);
};

// Ajout de la fonctionnalité de suppression pour l'input de recherche dans le header
const searchInput = document.getElementById('chercheRecette');
const clearSearchButton = document.getElementById('clearSearchInput');

// 

// Vérifie si les éléments de recherche et de suppression existent dans le DOM
if (searchInput && clearSearchButton) {
    // Ajoute un écouteur d'événement 'input' sur l'élément de recherche
    searchInput.addEventListener('input', () => {
        // Appelle la fonction toggleDeleteBtn pour afficher ou cacher le bouton de suppression
        toggleDeleteBtn(searchInput, clearSearchButton);

        // Appelle la fonction RecherchePrincipal avec la valeur actuelle de l'input
        RecherchePrincipal(searchInput.value); // Exécute la fonction de recherche
    });

    // Ajoute un écouteur d'événement 'click' sur le bouton de suppression
    clearSearchButton.addEventListener('click', () => {
        // Réinitialise la valeur de l'input de recherche
        searchInput.value = '';

        // Ajoute la classe 'hidden' pour cacher le bouton de suppression
        clearSearchButton.classList.add('hidden');

        // Réinitialise tous les tags
        resetTags();

        // Réinitialise les recettes filtrées
        resetRecetteFiltrees(); 

        // Met à jour les recettes courantes avec toutes les recettes
        updateRecetteCourante(ToutesRecettes);

        // Masque le message de résultats nuls
        handleNoResultsMessage();

        // Met à jour les listes déroulantes avec toutes les recettes
        AfficheListeDeroulanteFiltre(ToutesRecettes); // Réinitialise les listes déroulantes
    });
} 




AfficheListeDeroulanteFiltre(RecetteFiltrees);
AfficheRecetteCards();

