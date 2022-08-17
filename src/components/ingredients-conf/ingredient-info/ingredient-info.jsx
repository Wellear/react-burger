import ingredientInfoStyles from "./ingredient-info.module.css";

const IngredientInfo = ({ info, children }) => {
  return (
    <li className={ingredientInfoStyles.info}>
      <p className="text mb-2">{children}</p>
      <p className="text text_type_digits-default">{info}</p>
    </li>
  );
};

export default IngredientInfo;
