export default class RecetteCard {
    constructor(recette) {
        this.recette = recette;
    }

    createCard() {
        const cardSection = document.querySelector('.card_section');
        const cardContent = `
            <article class="card relative w-400 h-400 rounded-lg overflow-hidden bg-white m-4 lg:w-11/12 h-600" data-id=${this.recette.id} aria-labelledby="recette-title-${this.recette.id}">
                ${this.recette.time > 0
                ? `<p class="card_time absolute top-5 right-5 px-2.5 py-1.5 rounded-lg text-[0.8rem] font-manrope bg-jaune" aria-label="Temps de préparation">
                        ${this.recette.time > 60
                    ? `${Math.floor(this.recette.time / 60)} h ${this.recette.time % 60} min`
                    : `${this.recette.time} min`
                }
                    </p>`
                : ''
            }
                <div class="h-1/2 flex items-center justify-center overflow-hidden">
                    <img src="./src/img/recette/recette/${this.recette.image}" alt="Image de ${this.recette.name}" class="object-cover h-full w-full"  aria-describedby="recette-title-${this.recette.id}">
                </div>
                <div class="h-1/2 p-4 overflow-y-auto">
                    <h2 id="recette-title-${this.recette.id}" class="text-noir text-2xl font-anton mb-2 ">${this.recette.name}</h2>
                    <div class="card_infos_instructions mb-2">
                        <h3 class="text-lg font-manrope uppercase font-gris-light tracking-wider">Recette</h3>
                        <p class="text-sm font-manrope" aria-labelledby="recette-title-${this.recette.id}">${this.recette.description}</p>
                    </div>
                    <div class="card_infos_ingredients">
                        <h3 class="text-lg font-manrope uppercase font-gris tracking-wider">Ingrédients</h3>
                        <div>
                            <ul class="text-sm font-manrope grid grid-cols-2 gap-3 m-3">
                                ${this.recette.ingredients.map(ingredient => {
                if (ingredient.quantity && ingredient.unit) {
                    return `
                                    <li aria-label="${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}">
                                        <div class="flex flex-col">
                                            <span class="font-bold">${ingredient.ingredient}</span>
                                            <span>${ingredient.quantity} ${ingredient.unit}</span>
                                        </div>
                                    </li>
                                `;
                } else {
                    return `
                                    <li aria-label="${ingredient.ingredient}">
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
