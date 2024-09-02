import { normalString } from "../utils/normalString.js";

export function filterRecettesByTagsUstensile(tags, recettes) {
    let results = [];    
    for (const recette of recettes) {
        let containsAllTags = true;        
        for (const tag of tags) {
            let containsTag = false;
            for (const ustensil of recette.ustensils) {
                if (normalString(ustensil).includes(normalString(tag))) {
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
}
