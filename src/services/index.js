import {
    combineReducers
} from "redux";
import {
    constructorReducer
} from "./reducers/burger-constructor";
import {
    burgerIngredientsReducer
} from "./reducers/burger-ingredients";
import {
    modalReducer
} from "./reducers/modal";
import {
    orderReducer
} from "./reducers/order-details";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    burgerConstructor: constructorReducer,
});