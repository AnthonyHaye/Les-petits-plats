export const extractLesMoyens = recet =>{
        const LesMoyens ={
                ingredients : new Set(),
                appliances: new Set(),
                ustensils: new Set()
        };

        const addMoyenADisposer = (MoyenADisposer, value)=> MoyenADisposer.add(value.toLowerCase());
        
        recet.forEach( recette => {
                recette.ingredients.forEach(ingredient => addMoyenADisposer(LesMoyens.ingredients, ingredient.ingredient));
                addMoyenADisposer(LesMoyens.appliances, recette.appliance);
                recette.ustensils.forEach(ustensil => addMoyenADisposer(LesMoyens.ustensils, ustensil));
                
        });

        //tableau pour trie par ordre alphabétique

        const MoyenADisposerTableau = {};
        for (const Moyen in LesMoyens){
                MoyenADisposerTableau[Moyen] = Array.from(LesMoyens[Moyen]).sort();
        }
        //console.log(MoyenADisposerTableau);
        return MoyenADisposerTableau;
};