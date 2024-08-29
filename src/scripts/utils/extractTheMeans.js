import { normalString } from "./normalString.js";
export const extractTheMeans = recet => {
        const theMeans = {
            ingredients: new Set(),
            appliances: new Set(),
            ustensils: new Set()
        };
    
        const addMeanToDispose = (meanToDispose, value) => meanToDispose.add(normalString(value));
    
        recet.forEach(recette => {
            recette.ingredients.forEach(ingredient => addMeanToDispose(theMeans.ingredients, ingredient.ingredient));
            addMeanToDispose(theMeans.appliances, recette.appliance);
            recette.ustensils.forEach(ustensil => addMeanToDispose(theMeans.ustensils, ustensil));
        });
    
        // Converted the sets into sorted tables in alphabetical order
        const meanToDisposeArray = {
            ingredients: Array.from(theMeans.ingredients).sort(),
            appliances: Array.from(theMeans.appliances).sort(),
            ustensils: Array.from(theMeans.ustensils).sort()
        };
    
        return meanToDisposeArray;
    };
    