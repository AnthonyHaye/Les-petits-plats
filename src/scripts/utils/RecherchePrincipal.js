import { updateRecetteCourante, ToutesRecettes, AfficheListeDeroulanteFiltre } from '../page/main.js';

export const searchRecettes = (query) => {
    if (!query) {
        updateRecetteCourante(ToutesRecettes);
        AfficheListeDeroulanteFiltre(ToutesRecettes);
        return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filteredRecettes = ToutesRecettes.filter(recette => {
        return recette.name.toLowerCase().includes(lowerCaseQuery) ||
            recette.description.toLowerCase().includes(lowerCaseQuery) ||
            recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseQuery));
    });

    updateRecetteCourante(filteredRecettes);
    AfficheListeDeroulanteFiltre(filteredRecettes);
};
