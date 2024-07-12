console.log('Bonjour Anthony Haye haye');
import Api from '../api/api.js';
import Recette from '../models/Recette.js';
import RecetteCard from '../components/RecetteCard.js';

const recetteApi = new Api('./data/recipes.json');
export const ToutesRecettes = await recetteApi.get();
//console.log(ToutesRecettes);
// Copie du tableau de recettes pour pouvoir filtrer les recettes en cours
export const RecetteCourante = [...ToutesRecettes];
//console.log(RecetteCourante);
//met à jour le tableau RecetteCourante pour qu'il contienne les mêmes éléments du tableau RecetteFiltre.
export const updateRecetteCourante = RecetteFiltre => { RecetteCourante.splice(0, RecetteCourante.length, ...RecetteFiltre)};

export const selectedTags =[];
export const dropdowns = [];
export const RecetteARechercher = document.querySelector('#chercheRecette');
//console.log(RecetteARechercher.value);

export const AfficheRecetteCards = () => {
        ToutesRecettes
                .map(recette => new Recette(recette))
                .forEach(recette => {
                        const templateCard = new RecetteCard(recette);
                        console.log(templateCard);
                        templateCard.createCard();                        
                })
};

AfficheRecetteCards();
