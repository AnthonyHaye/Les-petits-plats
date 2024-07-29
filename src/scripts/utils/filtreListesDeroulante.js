export const filtreListesDeroulante = (items, query) => {
        return items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    };