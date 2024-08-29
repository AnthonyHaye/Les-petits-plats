import { updateCurrentRecipe, AllRecipes, DisplayFilteredDropdownList, FilterRecipes } from '../page/main.js';
import { normalString } from './normalString.js';

// Function to display or hide the error message
export const handleNoResultsMessage = (message) => {
    const noResultsMessage = document.getElementById('no-results-message');
    if (noResultsMessage) {
        noResultsMessage.textContent = message || '';
        noResultsMessage.setAttribute('role', 'alert');
        noResultsMessage.setAttribute('aria-live', 'polite');
        
        if (message) {
            noResultsMessage.classList.remove('hidden');
            noResultsMessage.classList.add('block', 'bg-black','text-jaune', 'text-2xl','font-anton', 'px-4', 'py-2', 'mt-4', 'rounded-lg', 'lg:text-4xl' );        
        } else {
            noResultsMessage.classList.add('hidden');
        }
    }
};


export const mainSearch = (StringSearch) => {
    // If no search word is provided or if the length of the search word is less than 3
    if (!StringSearch || StringSearch.length < 3) {
        handleNoResultsMessage();
        updateCurrentRecipe(AllRecipes); 
        DisplayFilteredDropdownList(AllRecipes);        
        return;
    }
    const normalizedQuery = normalString(StringSearch);
    FilterRecipes.length = 0; 

    for (const recette of AllRecipes) {
        const normalizedRecetteName = normalString(recette.name);
        const normalizedRecetteDescription = normalString(recette.description);
        if (normalizedRecetteName.includes(normalizedQuery) ||
            normalizedRecetteDescription.includes(normalizedQuery)) {
            FilterRecipes.push(recette);
            continue;
        }
        for (const ingredient of recette.ingredients) {
            const normalizedIngredient = normalString(ingredient.ingredient);
            if (normalizedIngredient.includes(normalizedQuery)) {
                FilterRecipes.push(recette);
                break;
            }
        }
    }

    if (FilterRecipes.length === 0) {
        handleNoResultsMessage(`Aucune recette ne contient '${StringSearch}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`);
    } else {
        handleNoResultsMessage();
    }

    updateCurrentRecipe(FilterRecipes);
    DisplayFilteredDropdownList(FilterRecipes);
};
