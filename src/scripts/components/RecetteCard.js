export default class RecetteCard {
        constructor(recette) {
            this.recette = recette;
        }
    
        createCard() {
            const cardSection = document.querySelector('.card_section');
            const cardContent = `
                <article class="card relative max-h-[600px] max-w-[400px] rounded-lg overflow-hidden bg-white m-4" data-id=${this.recette.id}>
                    ${
                        this.recette.time > 0
                        ? `<p class="card_time absolute top-5 right-5 px-2.5 py-1.5 rounded-lg text-[0.8rem] font-manrope bg-jaune">
                            ${
                                this.recette.time > 60
                                ? `${Math.floor(this.recette.time / 60)} h ${this.recette.time % 60} min`
                                : `${this.recette.time} min`
                            }
                        </p>`
                        : ''
                    }
                    <div class="h-[50%] w-full">
                        <img src="./img/recette/recette/${this.recette.image}" alt="${this.recette.name}" class="h-full w-full object-cover">
                    </div>
                    <div class="card_infos m-2 overflow-y-auto max-h-[50%]">
                        <h2 class="text-noir text-2xl font-anton mb-2 ">${this.recette.name}</h2>
                        <div class="card_infos_instructions mb-2">
                            <h3 class="text-lg font-manrope uppercase font-gris-light tracking-wider">Recette</h3>
                            <p class="text-sm font-manrope">${this.recette.description}</p>
                        </div>
                        <div class="card_infos_ingredients">
                            <h3 class="text-lg font-manrope uppercase font-gris tracking-wider">Ingrédients</h3>
                            <div >
                                <ul class="text-sm font-manrope grid grid-cols-2 gap-3">
                                    ${this.recette.ingredients.map(ingredient => {
                                        if (ingredient.quantity && ingredient.unit) {
                                            return `
                                                <li >
                                                    <div class = "flex flex-col">
                                                    <span class="font-bold">${ingredient.ingredient}</span> <br>
                                                    <span >${ingredient.quantity} ${ingredient.unit}</span>
                                                    </div>
                                                </li>
                                            `;
                                        } else {
                                            return `
                                                <li >
                                                    <span class="font-bold">${ingredient.ingredient}</span>
                                                </li>
                                            `;
                                        }
                                    }).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            `;
            cardSection.innerHTML += cardContent;
        }
    }
    