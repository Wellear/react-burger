import IngredientsItem from "../ingredient-item/ingredient-item";
import categoryStyle from "./ingredients-category.module.css";
import PropTypes from 'prop-types';
import { arrayOfIngredientsTypes } from "../../../utils/constns";

const IngredientsCategory = ({ category, ingredients }) => {
  const items = ingredients.filter(item => item.type === category.type);
  return (
    <li>
      <p className="text text_type_main-medium mt-10 mb-6">{category.name}</p>
      <ul className={categoryStyle.list}>
        {items.map(item => (
          <IngredientsItem key={item._id} item={item} />
        ))}
      </ul>
    </li>
  );
};

IngredientsCategory.propTypes = {
  category: PropTypes.object.isRequired,
  ingredients: arrayOfIngredientsTypes
};

export default IngredientsCategory;
