// Fonction pour ajouter un tag
export const addTag = (tag) => {
        const tagSection = document.querySelector('.tag_section');
    
        // Vérifiez si le tag existe déjà
        const existingTags = tagSection.querySelectorAll('.tag');
        for (const existingTag of existingTags) {
            if (existingTag.querySelector('.tag-text').textContent === tag) {
                // Si le tag existe déjà, ne faites rien
                return;
            }
        }
    
        // Créez le nouvel élément de tag
        const tagElement = document.createElement('div');
        tagElement.className = 'tag w-48 h-12 flex items-center justify-between p-2 m-1 bg-jaune rounded-lg';
        tagElement.innerHTML = `
            <span class="tag-text">${tag}</span>
            <button class="ml-2 text-black hover:text-white">
                <span class="fas fa-times"></span>
            </button>
        `;
    
        // Ajoutez un écouteur d'événement pour le bouton de suppression
        tagElement.querySelector('button').addEventListener('click', () => {
            removeTag(tagElement);
        });
    
        tagSection.appendChild(tagElement);
    
        // Ajoutez ici la logique pour filtrer les recettes en fonction des étiquettes
    };
    
// Fonction pour supprimer un tag
export const removeTag = (tagElement) => {
tagElement.remove();
// Ajoutez ici la logique pour mettre à jour le filtre des recettes après la suppression d'un tag
};
    
    
    

