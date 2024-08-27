// Function to normalize a string: convert to lowercase, remove accents and diacritics
export const normalString = str => {
        return str
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, "");
    };