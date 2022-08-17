import { BASE_URL } from "./constns";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getIngredients = () => {
    return fetch(BASE_URL)
        .then(checkResponse);
}