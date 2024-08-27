import { normalString } from '../utils/normalString.js';
// Fonction de filtrage des recettes par tags d'appareils
export function filterRecettesByTagsAppareil(tags, recettes) {
    let results = [];
    // Parcours de chaque recette dans la liste des recettes
    for (const recette of recettes) {
        let containsAllTags = true;
        // Vérification de chaque tag dans la liste des tags sélectionnés
        for (const tag of tags) {
            // Vérification directe avec 'includes' car l'appareil est une chaîne de caractères unique
            if (!normalString(recette.appliance).includes(normalString(tag))) {
                containsAllTags = false;
                break;
            }
        }
        // Si la recette contient tous les tags, elle est ajoutée aux résultats
        if (containsAllTags) {
            results.push(recette);
        }
    }
    return results;
}
