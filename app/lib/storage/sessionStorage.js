export const setSessionStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
};

export const getSessionStorage = (key) => {
    if (typeof window !== 'undefined') {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    return null;
};

export const removeSessionStorage = (key) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key);
    }
};

export const clearSessionStorage = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.clear();
    }
};
