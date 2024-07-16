// Pour supprimer les accents et convertir en minuscules
export const normalString = str => {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };