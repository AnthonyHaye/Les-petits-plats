import { normalString } from "../utils/normalString.js";
// Fonction de filtrage des recettes par tags d'ustensiles
export function filterRecettesByTagsUstensile(tags, recettes) {
    let results = [];
    
    for (const recette of recettes) {
        let containsAllTags = true;
        
        for (const tag of tags) {            
            if (!recette.ustensils.some(ustensil => normalString(ustensil).includes(normalString(tag)))) {
                containsAllTags = false;
                break;
            }
        } 
        if (containsAllTags) {
            results.push(recette);
        }
    }
    return results;
}

