export const extractLesMoyens = recet =>{
        const LesMoyens ={
                ingredients : new Set()
        };

        const addMoyenADisposer = (MoyenADisposer, value)=> MoyenADisposer.add(value.toLowerCase());
        
        recet.forEach( recette => {
                recette.ingredients.forEach(ingredient => addMoyenADisposer(LesMoyens.ingredients, ingredient.ingredient));
                
        });

        //tableau pour trie par ordre alphabétique

        const MoyenADisposerTableau = {};
        for (const Moyen in LesMoyens){
                MoyenADisposerTableau[Moyen] = Array.from(LesMoyens[Moyen]).sort();
        }
        //console.log(MoyenADisposerTableau);
        return MoyenADisposerTableau;
};