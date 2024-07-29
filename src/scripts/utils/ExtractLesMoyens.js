export const extractLesMoyens = recet => {
        const LesMoyens = {
            ingredients: new Set(),
            appliances: new Set(),
            ustensils: new Set()
        };
    
        const addMoyenADisposer = (MoyenADisposer, value) => MoyenADisposer.add(value.toLowerCase());
    
        recet.forEach(recette => {
            recette.ingredients.forEach(ingredient => addMoyenADisposer(LesMoyens.ingredients, ingredient.ingredient));
            addMoyenADisposer(LesMoyens.appliances, recette.appliance);
            recette.ustensils.forEach(ustensil => addMoyenADisposer(LesMoyens.ustensils, ustensil));
        });
    
        // Convertir les sets en tableaux triés par ordre alphabétique
        const MoyenADisposerTableau = {
            ingredients: Array.from(LesMoyens.ingredients).sort(),
            appliances: Array.from(LesMoyens.appliances).sort(),
            ustensils: Array.from(LesMoyens.ustensils).sort()
        };
    
        return MoyenADisposerTableau;
    };
    