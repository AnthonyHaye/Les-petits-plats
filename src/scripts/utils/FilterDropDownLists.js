import { normalString } from './normalString.js';

// Function to filter items in a dropdown list based on a search query using normalString
export const filterDropDownLists = (items, query) => {
    // Use the filter method to create a new array with items that match the search query
    return items.filter(item => 
        normalString(item).includes(normalString(query))
    );
};