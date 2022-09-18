import {
    getIngredientsData
} from "../../utils/API";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const renderIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsData()
        .then((res) =>
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: res.data
            })
        )
        .catch(() => dispatch({
            type: GET_INGREDIENTS_FAILED
        }));
};