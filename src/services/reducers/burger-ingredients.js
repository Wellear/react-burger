import {
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_INGRIDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
      };
    case GET_INGRIDIENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};
