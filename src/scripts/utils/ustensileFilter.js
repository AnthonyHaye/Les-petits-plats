// Fonction de filtrage des recettes par tags d'ustensiles
// export function filterRecettesByTagsUstensile(tags, recettes) {
// Importation de la fonction normalString
import { normalString } from '../utils/normalString.js';

// Fonction de filtrage des recettes par tags d'ustensiles en utilisant une approche fonctionnelle
export function filterRecettesByTagsUstensile(tags, recettes) {
    return recettes.filter(recette => 
        // Vérifie si chaque tag est inclus dans les ustensiles de la recette
        tags.every(tag => 
            recette.ustensils.some(ustensile => 
                normalString(ustensile).includes(normalString(tag))
            )
        )
    );
}


