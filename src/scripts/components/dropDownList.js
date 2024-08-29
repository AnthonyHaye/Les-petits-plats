import { normalString } from "../utils/normalString.js";
import { addTag } from "./tagManager.js";
import { filterDropDownLists } from "../utils/FilterDropDownLists.js";
import { toggleDeleteBtn } from "../utils/toggleDeleteBtn.js";

export default class DropDownListClass {
    constructor(name, items, type) {
        this.name = name;
        this.items = items;
        this.filteredItems = items;
        this.type = type; 
        this.itemListe = null;
    }

    createListeDeroulante() {
        const DropDownContent = `
            <div class="DropDownListClass w-52 m-1 bg-white rounded-lg relative" role="listbox" aria-labelledby="dropdown-header-${this.name}">
                <div class="dropdown-header flex items-center justify-between p-2 hover:bg-jaune cursor-pointer rounded-t-lg" id="dropdown-header-${this.name}" role="button" aria-expanded="false" aria-controls="dropdown-content-${this.name}">
                    <span class="dropdown-title pr-2">${this.name}</span>
                    <button type="button" class="dropdown_btn text-black" aria-label="Toggle ${this.name} list">
                        <span class="fas fa-chevron-down transition-transform duration-200" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="absolute w-full hidden rounded-b-lg dropdown-content bg-white">
                    <div class="m-2 p-1 flex flex-row items-center border-solid border-2 border-jaune">
                        <input tabindex="-1" type="text" id="search-${this.name}" maxlength="12" placeholder="Rechercher..." class="outline-none bg-white w-5/6" aria-controls="dropdown-list-${this.name}" aria-describedby="dropdown-header-${this.name}">
                        <button tabindex="-1" class="text-gray-400 hidden ml-2" id="clearInput" aria-label="Clear search">
                            <span class="fas fa-times hover:text-jaune"></span>
                        </button>
                        <span class="fas fa-search ml-2 hover:text-jaune" aria-hidden="true"></span>
                        <label for="search-${this.name}" aria-label="Search by ${this.name}" class="sr-only"></label>
                    </div>
                    <ul class="dropdown_content_list p-2 rounded max-h-60 overflow-y-auto">
                        ${this.items.map(item => `<li class="p-1 hover:bg-jaune cursor-pointer dropdown-item-${this.type}" role="option">${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `; 

        const DropDownWrapper = document.createElement('div');
        DropDownWrapper.setAttribute('class', 'dropdown-wrapper m-2 relative');
        DropDownWrapper.innerHTML = DropDownContent;

        const inputElement = DropDownWrapper.querySelector(`#search-${this.name}`);
        const clearButton = DropDownWrapper.querySelector('#clearInput');
        this.itemListe = DropDownWrapper.querySelectorAll('.dropdown_content_list li');

        inputElement.addEventListener('input', () => {
            this.search(normalString(inputElement.value), DropDownWrapper);
            toggleDeleteBtn(inputElement, clearButton);
        });

        clearButton.addEventListener('click', () => {
            inputElement.value = '';
            clearButton.classList.add('hidden');
            this.search('', DropDownWrapper);
        });

        this.itemListe.forEach(item => {
            item.addEventListener('click', () => {
                this.handleItemClick(item.textContent);
            });
        });      
        return DropDownWrapper;
    }

    handleItemClick(item) {
        addTag(item, this.type); 
    }

    search(recherche, wrapper) {
        this.filteredItems = filterDropDownLists(this.items, recherche);
        this.updateList(wrapper);
    }
    
    updateList(wrapper) {
        const listContainer = wrapper.querySelector('.dropdown_content_list');
        listContainer.innerHTML = this.filteredItems.map(item => `<li class="p-1 hover:bg-jaune cursor-pointer dropdown-item-${this.type}" role="option">${item}</li>`).join('');    
        this.itemListe = listContainer.querySelectorAll('li');
        this.itemListe.forEach(item => {
            item.addEventListener('click', () => {
                this.handleItemClick(item.textContent);
            });
        });
    }   
}