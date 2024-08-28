import { normalString } from "./normalString.js";
export const extractTheMeans = recet => {
        const theMeans = {
            ingredients: new Set(),
            appliances: new Set(),
            ustensils: new Set()
        };
    
        const addMoyenADisposer = (MoyenADisposer, value) => MoyenADisposer.add(normalString(value));
    
        recet.forEach(recette => {
            recette.ingredients.forEach(ingredient => addMoyenADisposer(theMeans.ingredients, ingredient.ingredient));
            addMoyenADisposer(theMeans.appliances, recette.appliance);
            recette.ustensils.forEach(ustensil => addMoyenADisposer(theMeans.ustensils, ustensil));
        });
    
        // Converted the sets into sorted tables in alphabetical order
        const MoyenADisposerTableau = {
            ingredients: Array.from(theMeans.ingredients).sort(),
            appliances: Array.from(theMeans.appliances).sort(),
            ustensils: Array.from(theMeans.ustensils).sort()
        };
    
        return MoyenADisposerTableau;
    };
    