import Api from '../api/api.js';
import Recette from '../models/Recette.js';
import RecetteCard from '../components/RecetteCard.js';
import DropDownListClass from '../components/dropDownList.js';
import { openCloseDropdown } from '../utils/openCloseDropdown.js';
import { extractTheMeans } from '../utils/extractTheMeans.js';
import { toggleDeleteBtn } from '../utils/toggleDeleteBtn.js';
import { mainSearch, handleNoResultsMessage } from '../utils/mainSearch.js';
import { resetTags } from '../components/tagManager.js';

const recetteApi = new Api('src/data/recipes.json');
export const AllRecipes = await recetteApi.get();

// Copy of the recipe panel to be able to filter the current recipes
export const CurrentRecipe = [...AllRecipes];

export const updateCurrentRecipe = FilterRecipe => {
    CurrentRecipe.splice(0, CurrentRecipe.length, ...FilterRecipe);
    DisplayRecipeCards(); 
    UpdateRecipesNumber(); 
};

export const selectedTags = {
    ingredients: [],
    appareils: [],
    ustensiles: []
};
const DropDownList = [];

export const DisplayFilteredDropdownList = (recettes = AllRecipes) => {
    const RecipesNumber = document.querySelector('.nbr_recette');
    RecipesNumber.textContent = `${recettes.length} recettes`;

    const filterSection = document.querySelector('.contenairFiltre');
    filterSection.innerHTML = ''; 

    const ustensileListeDeroulante = new DropDownListClass('Ustensiles', extractTheMeans(recettes).ustensils, 'ustensiles');
    filterSection.appendChild(ustensileListeDeroulante.createListeDeroulante());
    DropDownList.push(ustensileListeDeroulante);        

    const appareilsListeDeroulante = new DropDownListClass('Appareils', extractTheMeans(recettes).appliances, 'appareils');
    filterSection.appendChild(appareilsListeDeroulante.createListeDeroulante());
    DropDownList.push(appareilsListeDeroulante);

    const ingredientListeDeroulante = new DropDownListClass('Ingrédients', extractTheMeans(recettes).ingredients, 'ingredients');
    filterSection.appendChild(ingredientListeDeroulante.createListeDeroulante());
    DropDownList.push(ingredientListeDeroulante);
    openCloseDropdown();
};

const DisplayRecipeCards = () => {
    const cardSection = document.querySelector('.card_section');
    cardSection.innerHTML = ''; 
    CurrentRecipe
        .map(recette => new Recette(recette))
        .forEach(recette => {
            const templateCard = new RecetteCard(recette);
            templateCard.createCard();
        });
};

// Function to update the number of recipes displayed
const UpdateRecipesNumber = () => {
    const RecipesNumber = document.querySelector('.nbr_recette');
    RecipesNumber.textContent = `${CurrentRecipe.length} recettes`;
};

export const FilterRecipes = [...AllRecipes]; 

// Function to reset filtered recipes
export const ResetFilterRecipe = () => {
    FilterRecipes.splice(0, FilterRecipes.length, ...AllRecipes);
};


const searchInput = document.getElementById('chercheRecette');
const clearSearchButton = document.getElementById('clearSearchInput');
if (searchInput && clearSearchButton) {
    searchInput.addEventListener('input', () => {
        toggleDeleteBtn(searchInput, clearSearchButton);
        mainSearch(searchInput.value); 
    });
    // Add an event earphone 'click' on the deletion button
    clearSearchButton.addEventListener('click', () => {
        // Function update
        searchInput.value = '';
        clearSearchButton.classList.add('hidden');
        resetTags();
        ResetFilterRecipe(); 
        updateCurrentRecipe(AllRecipes);
        handleNoResultsMessage();
        DisplayFilteredDropdownList(AllRecipes); 
    });
} 

DisplayFilteredDropdownList(FilterRecipes);
DisplayRecipeCards();