import { normalString } from '../utils/normalString.js';
// Recipes filtering by devices tags
export function filterRecettesByTagsAppareil(tags, recipes) {
    let results = [];
    for (const recipe of recipes) {
        let containsAllTags = true;
        for (const tag of tags) {
            if (!normalString(recipe.appliance).includes(normalString(tag))) {
                containsAllTags = false;
                break;
            }
        }
        if (containsAllTags) {
            results.push(recipe);
        }
    }
    return results;
}
