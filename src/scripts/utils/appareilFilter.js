import { normalString } from '../utils/normalString.js';

export function filterRecettesByTagsAppareil(tags, recettes) {
    return recettes.filter(recette =>
        tags.every(tag =>
            normalString(recette.appliance).includes(normalString(tag))
        )
    );
}
