// Fonction de filtrage des recettes par tags d'ustensiles
export function filterRecettesByTagsUstensile(tags, recettes) {
    // Initialisation d'un tableau pour stocker les résultats de la recherche
    let results = [];
    
    // Parcours de chaque recette dans la liste des recettes
    for (const recette of recettes) {
        // Initialisation d'un indicateur pour vérifier si la recette contient tous les tags
        let containsAllTags = true;
        
        // Vérification de chaque tag dans la liste des tags sélectionnés
        for (const tag of tags) {
            // Utilisation de 'some' pour vérifier si au moins un des ustensiles contient le tag
            // 'some' retourne true si au moins un élément du tableau satisfait la condition
            if (!recette.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase()))) {
                // Si un ustensile ne contient pas le tag, on marque containsAllTags comme false et on sort de la boucle
                containsAllTags = false;
                break;
            }
        }
        
        // Si la recette contient tous les tags, elle est ajoutée aux résultats
        if (containsAllTags) {
            results.push(recette);
        }
    }
    
    // Retourne les résultats de la recherche
    return results;
}

