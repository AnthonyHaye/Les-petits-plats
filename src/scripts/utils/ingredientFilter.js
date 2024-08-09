// Importation de la fonction normalString
import { normalString } from '../utils/normalString.js';

// Fonction de filtrage des recettes par tags d'ingrédients en utilisant une approche fonctionnelle
export function filterRecettesByTagsIngredient(tags, recettes) {
    return recettes.filter(recette => 
        // Vérifie si chaque tag est inclus dans les ingrédients de la recette
        tags.every(tag => 
            recette.ingredients.some(ingredient => 
                normalString(ingredient.ingredient).includes(normalString(tag))
            )
        )
    );
}

