import PropTypes from 'prop-types';

const ingredientTypes = {
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired
}
const ITEM_DISPLAY = 48;
const MAX_ITEMS = 6;
const BASE_URL = "https://norma.nomoreparties.space/api";
const AUTH_URL = `${BASE_URL}/auth`;
const WS_ORDERS_ALL = 'wss://norma.nomoreparties.space/orders/all';
const WS_ORDERS = 'wss://norma.nomoreparties.space/orders';
const itemTypes = PropTypes.shape(ingredientTypes).isRequired
const arrayOfIngredientsTypes = PropTypes.arrayOf(itemTypes).isRequired

export { BASE_URL,itemTypes,arrayOfIngredientsTypes,AUTH_URL,WS_ORDERS_ALL,WS_ORDERS,MAX_ITEMS,ITEM_DISPLAY};
