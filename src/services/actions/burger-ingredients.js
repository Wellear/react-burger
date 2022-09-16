import {
    getIngredientsData
} from "../../utils/API";

export const GET_INGRIDIENTS_REQUEST = "GET_INGRIDIENTS_REQUEST";
export const GET_INGRIDIENTS_SUCCESS = "GET_INGRIDIENTS_SUCCESS";
export const GET_INGRIDIENTS_FAILED = "GET_INGRIDIENTS_FAILED";

export const renderIngredients = () => (dispatch) => {
    dispatch({
        type: GET_INGRIDIENTS_REQUEST
    });
    getIngredientsData()
        .then((res) =>
            dispatch({
                type: GET_INGRIDIENTS_SUCCESS,
                payload: res.data
            })
        )
        .catch(() => dispatch({
            type: GET_INGRIDIENTS_FAILED
        }));
};