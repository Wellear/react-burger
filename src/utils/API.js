import { BASE_URL } from "./constns";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsData = () => {
  return fetch(BASE_URL).then(checkResponse);
};
export const postOrder = async (orderId) => {
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: orderId,
    }),
  }).then(checkResponse);
};
