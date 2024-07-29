// utils/ingredientFilter.js

export function filterRecettesByTagsIngredient(tags, recettes) {
        let results = [];
        for (const recette of recettes) {
            let containsAllTags = true;
            for (const tag of tags) {
                let containsTag = false;
                for (const ingredient of recette.ingredients) {
                    if (ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) {
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
                results.push(recette);
            }
        }
        return results;
        console.log("tu es passé dans le filtre pour ingrédient")
    }
    