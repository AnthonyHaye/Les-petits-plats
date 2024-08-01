// Importation des fonctions nécessaires depuis le fichier 'main.js'
import { updateRecetteCourante, ToutesRecettes, AfficheListeDeroulanteFiltre, RecetteFiltrees } from '../page/main.js';
// Importation de la fonction normalString
import { normalString } from '../utils/normalString.js';

// Exportation de la fonction 'RecherchePrincipal'
export const RecherchePrincipal = (MotRechercher) => {
    // Si aucun mot de recherche n'est fourni ou si la longueur du mot de recherche est inférieure à 3
    if (!MotRechercher || MotRechercher.length < 3) {
        // Met à jour les recettes courantes avec toutes les recettes
        updateRecetteCourante(ToutesRecettes);
        // Met à jour les listes déroulantes avec toutes les recettes
        AfficheListeDeroulanteFiltre(ToutesRecettes);
        // Sort de la fonction
        return;
    }

    // Normalise le mot de recherche pour une comparaison insensible à la casse et aux accents
    const normalizedQuery = normalString(MotRechercher);

    // Vide le tableau des recettes filtrées
    RecetteFiltrees.length = 0; 

    // Parcourt toutes les recettes
    for (const recette of ToutesRecettes) {
        // Normalise le nom de la recette et sa description
        const normalizedRecetteName = normalString(recette.name);
        const normalizedRecetteDescription = normalString(recette.description);

        // Vérifie si le nom de la recette ou sa description contient le mot de recherche normalisé
        if (normalizedRecetteName.includes(normalizedQuery) ||
            normalizedRecetteDescription.includes(normalizedQuery)) {
            // Si oui, ajoute la recette aux résultats filtrés
            RecetteFiltrees.push(recette);
            // Passe à la recette suivante
            continue;
        }
        
        // Si le nom ou la description ne correspond pas, vérifie les ingrédients
        for (const ingredient of recette.ingredients) {
            // Normalise le nom de l'ingrédient
            const normalizedIngredient = normalString(ingredient.ingredient);
            // Vérifie si l'ingrédient contient le mot de recherche normalisé
            if (normalizedIngredient.includes(normalizedQuery)) {
                // Si oui, ajoute la recette aux résultats filtrés
                RecetteFiltrees.push(recette);
                // Sort de la boucle des ingrédients pour cette recette
                break;
            }
        }
    }

    // Met à jour les recettes courantes avec les recettes filtrées
    updateRecetteCourante(RecetteFiltrees);
    // Met à jour les listes déroulantes avec les recettes filtrées
    AfficheListeDeroulanteFiltre(RecetteFiltrees);
};

