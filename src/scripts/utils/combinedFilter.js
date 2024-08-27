import { filterRecettesByTagsIngredient } from './ingredientFilter.js';
import { filterRecettesByTagsAppareil } from './appareilFilter.js';
import { filterRecettesByTagsUstensile } from './ustensileFilter.js';

export function combinedFilter(tags, recettes) {        
    let results = recettes;
    
    // Filtrer par ingrédients
    if (tags.ingredients.length > 0) {
        results = filterRecettesByTagsIngredient(tags.ingredients, results);
    }
    // Filtrer par appareils
    if (tags.appareils.length > 0) {
        results = filterRecettesByTagsAppareil(tags.appareils, results);
    }
    // Filtrer par ustensiles
    if (tags.ustensiles.length > 0) {
        results = filterRecettesByTagsUstensile(tags.ustensiles, results);
    }
    return results;
}
