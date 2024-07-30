// Fonction de filtrage des recettes par tags d'ustensiles
export function filterRecettesByTagsUstensile(tags, recettes) {
    let results = [];
    // Parcours de chaque recette dans la liste des recettes
    for (const recette of recettes) {
        let containsAllTags = true;
        // Vérification de chaque tag dans la liste des tags sélectionnés
        for (const tag of tags) {
            // Utilisation de 'some' pour vérifier si au moins un des ustensiles contient le tag
            if (!recette.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase()))) {
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
