// listeDeroulante.js
import { normalString } from "../utils/normalString.js";
import { addTag } from "./tagManager.js";
import { filtreListesDeroulante } from "../utils/filtreListesDeroulante.js";
import { toggleDeleteBtn } from "../utils/toggleDeleteBtn.js";
export default class ListeDeroulante {
    constructor(name, items, type) {
        this.name = name;
        this.items = items;
        this.filtreItems = items;
        this.type = type; // Ajout du type ici
        this.itemListe = null;
    }

    createListeDeroulante() {
        console.log("Liste Deroulante Créée");
        const listeDeroulanteContenu = `
            <div class="listeDeroulante w-52 m-1 bg-white rounded-lg relative" role="listbox" aria-labelledby="dropdown-header-${this.name}">
                <div class="dropdown-header flex items-center justify-between p-2 hover:bg-jaune cursor-pointer rounded-t-lg" id="dropdown-header-${this.name}" role="button" aria-expanded="false" aria-controls="dropdown-content-${this.name}" >
                    <span class="dropdown-title pr-2">${this.name}</span>
                    <button type="button" class="dropdown_btn text-black"aria-label="Toggle ${this.name} list">
                        <span class="fas fa-chevron-down transition-transform duration-200" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="absolute w-full hidden rounded-b-lg dropdown-content bg-white">
                    <div class="m-2 p-1 flex flex-row items-center border-solid border-2 border-jaune">
                        <input tabindex="-1" type="text" id="search-${this.name}" maxlength="12" placeholder="Rechercher..." class="outline-none bg-white w-5/6"  aria-controls="dropdown-list-${this.name}" aria-describedby="dropdown-header-${this.name}">
                        <button tabindex="-1" class="text-gray-400 hidden ml-2" id="clearInput" aria-label="Clear search">
                            <span class="fas fa-times hover:text-jaune"></span>
                        </button>
                        <span class="fas fa-search ml-2 hover:text-jaune"aria-hidden="true"></span>
                        <label for="search-${this.name}" aria-label="Search by ${this.name}" class="sr-only"></label>
                    </div>
                    <ul class="dropdown_content_list p-2 rounded max-h-60 overflow-y-auto">
                        ${this.items.map(item => `<li class="p-1 hover:bg-jaune cursor-pointer" role="option">${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `; 

        const listeDeroulanteWrapper = document.createElement('div');
        listeDeroulanteWrapper.setAttribute('class', 'dropdown-wrapper m-2 relative');
        listeDeroulanteWrapper.innerHTML = listeDeroulanteContenu;

        const inputElement = listeDeroulanteWrapper.querySelector(`#search-${this.name}`);
        const clearButton = listeDeroulanteWrapper.querySelector('#clearInput');
        this.itemListe = listeDeroulanteWrapper.querySelectorAll('.dropdown_content_list li');

        inputElement.addEventListener('input', () => {
            this.search(normalString(inputElement.value), listeDeroulanteWrapper);
            toggleDeleteBtn(inputElement, clearButton);
        });

        clearButton.addEventListener('click', () => {
            inputElement.value = '';
            clearButton.classList.add('hidden');
            this.search('', listeDeroulanteWrapper);
        });

        // écouteur de clic sur chaque élément de la liste déroulante
        this.itemListe.forEach(item => {
            item.addEventListener('click', () => {
                this.handleItemClick(item.textContent);
                console.log("Un élément a été cliqué : " + item.textContent);
            });
        });

        this.tagHandler(inputElement);

        return listeDeroulanteWrapper;
    }
  
    handleItemClick(item) {
        // Ajoutez l'ingrédient sélectionné comme étiquette
        addTag(item, this.type); 
        // Filtrez les recettes en fonction des étiquettes
    }

    search(recherche, wrapper) {
        this.filteredItems = filtreListesDeroulante(this.items, recherche);
        this.updateList(wrapper);
    }
    
    updateList(wrapper) {
        // Sélectionne le conteneur de la liste déroulante dans le wrapper donné
        const listContainer = wrapper.querySelector('.dropdown_content_list');
    
        // Met à jour le contenu HTML du conteneur de la liste avec les éléments filtrés
        // Chaque élément est une liste ('li') avec des classes et le texte de l'élément
        //La méthode join('') est utilisée pour convertir le tableau d'éléments HTML en 
        //une chaîne de caractères unique, qui est ensuite attribuée à innerHTML.
        listContainer.innerHTML = this.filteredItems.map(item => `<li class="p-1 hover:bg-jaune cursor-pointer" role="option">${item}</li>`).join('');
    
        // Sélectionne tous les éléments de la liste ('li') dans le conteneur mis à jour
        this.itemListe = listContainer.querySelectorAll('li');
    
        // Ajoute un écouteur d'événement de clic à chaque élément de la liste
        // Lorsqu'un élément est cliqué, la fonction handleItemClick est appelée avec le texte de l'élément
        this.itemListe.forEach(item => {
            item.addEventListener('click', () => {
                this.handleItemClick(item.textContent);
                console.log("Un élément a été cliqué : " + item.textContent);
            });
        });
    }
    

    tagHandler(inputElement) {
        // Ajoutez ici votre logique de gestion des tags
    }
}
