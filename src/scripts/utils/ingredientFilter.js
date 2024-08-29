import { normalString } from '../utils/normalString.js';

export function filterRecettesByTagsIngredient(tags, recettes) {
    return recettes.filter(recette => 
        tags.every(tag => 
            recette.ingredients.some(ingredient => 
                normalString(ingredient.ingredient).includes(normalString(tag))
            )
        )
    );
}

