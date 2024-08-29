import { normalString } from '../utils/normalString.js';

export function filterRecettesByTagsUstensile(tags, recettes) {
    return recettes.filter(recette => 
        tags.every(tag => 
            recette.ustensils.some(ustensile => 
                normalString(ustensile).includes(normalString(tag))
            )
        )
    );
}


