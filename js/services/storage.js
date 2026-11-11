export const STORE = {
    read: (key, fallback = []) => {
        try {
            return JSON.parse(localStorage.getItem('ecoconecta_' + key)) ?? fallback;
        } catch {
            return fallback;
        }
    },

    write: (key, value) => {
        localStorage.setItem('ecoconecta_' + key, JSON.stringify(value));
    }
};