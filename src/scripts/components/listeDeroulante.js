import { normalString } from "../../utils/normalString.js";

export default class ListeDeroulante {
    constructor(name, items) {
        this.name = name;
        this.items = items;
        this.filtreItems = [];
        this.itemListe = null;
    }  
        
        createListeDeroulante() {
            console.log("Liste Deroulante Créée")
            const listeDeroulanteContenu = `
                <div class="listeDeroulante p-4 border rounded shadow-lg"> 
                <button type="button" class="w-full p-2 bg-jaune hover:bg-gray-300 flex justify-between items-center">
                    <span>${this.name}</span>
                    <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
                </button>
                <div class="mt-2">
                    <div class="mb-2 flex items-center border p-2 rounded">
                        <input tabindex="-1" type="text" id="search-${this.name}" maxlength="12" class="w-full p-2 border-none outline-none">
                        <span class="fa-solid fa-search ml-2"></span>
                        <button tabindex="-1" class="hidden"></button>
                        <label for="search-${this.name}" aria-label="Search by ${this.name}" class="sr-only"></label>
                    </div>
                    <ul class="dropdown_content_list p-2 border rounded max-h-60 overflow-y-auto">
                        ${this.items.map(item => `<li class="p-1 hover:bg-gray-100 cursor-pointer">${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            `;
    
            const listeDeroulanteWrapper = document.createElement('div');
            listeDeroulanteWrapper.setAttribute('class', 'dropdown-wrapper my-4');
            listeDeroulanteWrapper.innerHTML = listeDeroulanteContenu;
    
            const inputElement = listeDeroulanteWrapper.querySelector(`#search-${this.name}`);
            this.itemListe = listeDeroulanteWrapper.querySelectorAll('.dropdown_content_list li');
    
            inputElement.addEventListener('input', () => {
                this.search(normalString(inputElement.value));
                this.toggleDeleteBtn(inputElement);
            });
    
            this.tagHandler(inputElement);
    
            return listeDeroulanteWrapper;
        }
    
        search(query) {
            // Ajoutez ici votre logique de recherche
        }
    
        toggleDeleteBtn(inputElement) {
            // Ajoutez ici votre logique de bascule du bouton de suppression
        }
    
        tagHandler(inputElement) {
            // Ajoutez ici votre logique de gestion des tags
        }
    }