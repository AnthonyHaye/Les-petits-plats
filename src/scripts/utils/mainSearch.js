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
            noResultsMessage.classList.add('block', 'bg-black','text-jaune', 'text-2xl','font-anton', 'px-4', 'py-2', 'mt-4', 'rounded-lg', 'lg:text-4xl');        
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

    // Filter the recipes according to the request
    const fiteredeRecipes = AllRecipes.filter(recette => {
        const normalizedTitle = normalString(recette.name);
        const normalizedDescription = normalString(recette.description);
        const ingredientMatch = recette.ingredients.some(ingredient => 
            normalString(ingredient.ingredient).includes(normalizedQuery)
        );

        return normalizedTitle.includes(normalizedQuery) || normalizedDescription.includes(normalizedQuery) || ingredientMatch;
    });

    // Updates filterrecipes with filtered recipes
    FilterRecipes.splice(0, FilterRecipes.length, ...fiteredeRecipes);

    if (FilterRecipes.length === 0) {
        handleNoResultsMessage(`Aucune recette ne contient '${StringSearch}'. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`);
    } else {
        handleNoResultsMessage();
    }

    updateCurrentRecipe(FilterRecipes);
    DisplayFilteredDropdownList(FilterRecipes);
};
