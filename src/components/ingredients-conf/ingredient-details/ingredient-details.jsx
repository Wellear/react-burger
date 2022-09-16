import ingredientDetailsStyles from "./ingredient-details.module.css";
import { itemTypes } from "../../../utils/constns";
import IngredientInfo from "../ingredient-info/ingredient-info";

const IngredientDetails = ({ item }) => {
  return (
    <>
      <h1
        className={`text text_type_main-large pt-10 pr-10 pl-10 ${ingredientDetailsStyles.heading}`}
      >
        Детали ингридиента
      </h1>
      <div
        className={`${ingredientDetailsStyles.container} pt-10 pr-10 pb-15 pl-10`}
      >
        <img src={item.image_large} alt={item.name} className="mb-4" />
        <h2
          className={`mt-4 mb-8 text text_type_main-medium ${ingredientDetailsStyles.ingredient}`}
        >
          {item.name}
        </h2>
        <ul
          className={`${ingredientDetailsStyles.info} text_type_main-default text_color_inactive`}
        >
          <IngredientInfo info={item.calories}>Калории, ккал</IngredientInfo>
          <IngredientInfo info={item.proteins}>Белки, г</IngredientInfo>
          <IngredientInfo info={item.fat}>Жиры, г</IngredientInfo>
          <IngredientInfo info={item.carbohydrates}>Углеводы, г</IngredientInfo>
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  item: itemTypes,
};

export default IngredientDetails;
