import { normalString } from "../../utils/normalString.js";
import { toggleDeleteBtn } from "../../utils/toggleDeleteBtn.js";

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
            <div class="listeDeroulante w-52 m-1 bg-white rounded-lg">
                <div class="dropdown-header flex items-center justify-between p-2 hover:bg-jaune cursor-pointer rounded-t-lg">
                    <span class="dropdown-title pr-2">${this.name}</span>
                    <button type="button" class="dropdown_btn text-black">
                        <span class="fas fa-chevron-down transition-transform duration-200" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="mt-2 w-full hidden rounded-lg dropdown-content">
                    <div class="mb-2 flex items-center w-full border-solid border-2 border-jaune p-1 relative">


                        <input tabindex="-1" type="text" id="search-${this.name}" maxlength="12" placeholder="Rechercher..." class="w-full outline-none ring-0">

                        <button tabindex="-1" class=" hidden" id="clearInput">
                            <span class="fas fa-times  hover:text-jaune"></span>
                        </button>


                        <span class="fas fa-search ml-2 hover:text-jaune "></span>   

                        <label for="search-${this.name}" aria-label="Search by ${this.name}" class="sr-only"></label>

                    </div>
                    <ul class="dropdown_content_list p-2 rounded max-h-60 overflow-y-auto">
                        ${this.items.map(item => `<li class="p-1 hover:bg-jaune cursor-pointer">${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        const listeDeroulanteWrapper = document.createElement('div');
        listeDeroulanteWrapper.setAttribute('class', 'dropdown-wrapper my-4');
        listeDeroulanteWrapper.innerHTML = listeDeroulanteContenu;

        const inputElement = listeDeroulanteWrapper.querySelector(`#search-${this.name}`);        
        const clearButton = listeDeroulanteWrapper.querySelector('#clearInput');
        this.itemListe = listeDeroulanteWrapper.querySelectorAll('.dropdown_content_list li');

        inputElement.addEventListener('input', () => {
            this.search(normalString(inputElement.value));
            toggleDeleteBtn(inputElement, clearButton);
        });

        clearButton.addEventListener('click', () => {
            inputElement.value = '';
            clearButton.classList.add('hidden');
            this.search('');
        });

        this.tagHandler(inputElement);

        return listeDeroulanteWrapper;
    }

    // toggleDeleteBtn(inputElement, clearButton) {
    //     if (inputElement.value.length > 0) {
    //         clearButton.classList.remove('hidden');
    //     } else {
    //         clearButton.classList.add('hidden');
    //     }
    // }

    search(query) {
        // Ajoutez ici votre logique de recherche
    }

    tagHandler(inputElement) {
        // Ajoutez ici votre logique de gestion des tags
    }
}
