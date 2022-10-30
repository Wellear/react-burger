import { getIngredientsData } from "../../utils/API";
import {
  getRequest,
  requestFailed,
  requestSuccessed,
} from "../slices/burger-ingredients";

export const renderIngredients = () => (dispatch) => {
  dispatch(getRequest());
  getIngredientsData()
    .then((res) => dispatch(requestSuccessed(res.data)))
    .catch(() => dispatch(requestFailed()));
};
