import { normalString } from '../utils/normalString.js'; 

// Function to filter recipes based on ingredient tags
export function filterRecettesByTagsIngredient(tags, recettes) {
    let results = []; 

    for (const recette of recettes) {
        let containsAllTags = true; 

        for (const tag of tags) {
            let containsTag = false; 
            for (const ingredient of recette.ingredients) {
                // Normalize both the ingredient name and the tag for comparison
                if (normalString(ingredient.ingredient).includes(normalString(tag))) {
                    containsTag = true; 
                    break; 
                }
            }
            if (!containsTag) {
                containsAllTags = false; 
                break; 
            }
        }

        if (containsAllTags) {
            results.push(recette); // Add the recipe to the results if all tags are matched
        }
    }
    return results; 
}
