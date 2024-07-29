
// Cette fonction recherche les recettes contenant le terme de recherche dans leurs ingrédients en utilisant des boucles
export function AlgoRechercheBoucle(chercheTag, recettes) {
        // Initialisation d'un tableau pour stocker les résultats de la recherche
        let results = [];
        // Boucle à travers chaque recette
        for (let i = 0; i < recettes.length; i++) {
            // Boucle à travers chaque ingrédient de la recette courante
            for (let j = 0; j < recettes[i].ingredients.length; j++) {
                // Vérifie si l'ingrédient courant contient le terme de recherche (insensible à la casse)
                if (recettes[i].ingredients[j].ingredient.toLowerCase().includes(chercheTag.toLowerCase())) {
                    // Si oui, ajoute la recette aux résultats
                    results.push(recettes[i]);
                    // Sort de la boucle interne pour éviter d'ajouter la même recette plusieurs fois
                    break;
                }
            }
        }
        // Retourne les résultats de la recherche
        return results;
    }
/*
    Lisibilité : Cette approche est plus verbale et peut être plus facile à comprendre pour les débutants 
                en raison de l'utilisation explicite des boucles.
    Performance : Utilise des boucles for, ce qui peut être légèrement plus performant dans certains 
                cas spécifiques en raison de l'absence de surcharge des méthodes d'ordre supérieur. 
                Cependant, cette différence est souvent négligeable pour des collections de taille modérée.
    Complexité : Le code est plus verbeux, avec un niveau de complexité légèrement plus élevé en raison 
                des boucles imbriquées et des conditions.    
*/
/******************************************************************************************************************** */
// Cette fonction recherche les recettes contenant le terme de recherche dans leurs ingrédients en utilisant une approche fonctionnelle
export function AlgoRechercheFonctionnel(chercheTag, recettes) {
        // Utilise la méthode filter pour filtrer les recettes
        return recettes.filter(recette => 
            // Utilise la méthode some pour vérifier si au moins un ingrédient contient le terme de recherche (insensible à la casse)
            recette.ingredients.some(ingredient => 
                ingredient.ingredient.toLowerCase().includes(chercheTag.toLowerCase())
            )
        );
    }
/*
        Lisibilité : Cette approche est plus concise et utilise des méthodes d'ordre supérieur (filter, some),
                        ce qui peut la rendre plus lisible et maintenable pour ceux qui sont familiers avec les concepts fonctionnels de JavaScript.
        Performance : Bien que l'utilisation de méthodes d'ordre supérieur puisse avoir une légère surcharge, 
                        la différence de performance est généralement insignifiante pour des collections de taille modérée.
        Complexité : Le code est plus concis et expressif, réduisant le risque d'erreurs et facilitant la maintenance.
*/
/********************************************************** */
// Cette fonction recherche les recettes contenant le terme de recherche dans leurs ingrédients en utilisant des boucles for...of
export function AlgoRechercheForOf(chercheTag, recettes) {
    // Initialisation d'un tableau pour stocker les résultats de la recherche
    let results = [];
    // Boucle à travers chaque recette
    for (const recette of recettes) {
        // Boucle à travers chaque ingrédient de la recette courante
        for (const ingredient of recette.ingredients) {
            // Vérifie si l'ingrédient courant contient le terme de recherche (insensible à la casse)
            if (ingredient.ingredient.toLowerCase().includes(chercheTag.toLowerCase())) {
                // Si oui, ajoute la recette aux résultats
                results.push(recette);
                // Sort de la boucle interne pour éviter d'ajouter la même recette plusieurs fois
                break;
            }
        }
    }
    // Retourne les résultats de la recherche
    return results;
}
