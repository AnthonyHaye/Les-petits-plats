
// Importation des fonctions nécessaires depuis le fichier 'main.js'
import { updateRecetteCourante, ToutesRecettes, AfficheListeDeroulanteFiltre, RecetteFiltrees } from '../page/main.js';
// Importation de la fonction normalString
import { normalString } from '../utils/normalString.js';

/**
 * Fonction de recherche principale en utilisant une approche fonctionnelle.
 * 
 * @param {string} query - La chaîne de caractères à rechercher.
 */
      
export const RecherchePrincipal = (query) => {
    // Vérifie si la requête est vide ou contient moins de 3 caractères
    if (!query || query.length < 3) {
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes);
        return;
    }

    // Convertit la requête en minuscule et sans accents
    const lowerCaseQuery = normalString(query.toLowerCase());

    // Filtre les recettes en fonction de la requête
    const filteredRecettes = ToutesRecettes.filter(recette => {
        const normalizedTitle = normalString(recette.name.toLowerCase());
        const normalizedDescription = normalString(recette.description.toLowerCase());
        const ingredientMatch = recette.ingredients.some(ingredient => normalString(ingredient.ingredient.toLowerCase()).includes(lowerCaseQuery));
        
        return normalizedTitle.includes(lowerCaseQuery) || normalizedDescription.includes(lowerCaseQuery) || ingredientMatch;
    });

    // Met à jour les recettes affichées avec les recettes filtrées
    updateRecetteCourante(filteredRecettes);
    AfficheListeDeroulanteFiltre(filteredRecettes);
};

