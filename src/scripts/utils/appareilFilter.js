// Importation de la fonction normalString
import { normalString } from '../utils/normalString.js';

// Fonction de filtrage des recettes par tags d'appareils en utilisant une approche fonctionnelle
export function filterRecettesByTagsAppareil(tags, recettes) {
    return recettes.filter(recette =>
        // Vérifie si chaque tag est inclus dans l'appareil de la recette
        tags.every(tag =>
            normalString(recette.appliance).includes(normalString(tag))
        )
    );
}
