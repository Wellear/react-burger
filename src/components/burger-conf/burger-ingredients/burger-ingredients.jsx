import React from "react";
import ingredientsStyle from './burger-ingredients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import categories from "../../../utils/categories";
import IngredientsCategory from "../../ingredients-conf/ingredients-category/ingredients-category";
import { arrayOfIngredientsTypes } from "../../../utils/constns";

const BurgerIngredients = ({ingredients}) => {
  const [current, setCurrent] = React.useState("buns");
  return (
    <section className={ingredientsStyle.section}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={ingredientsStyle.tab}>
        <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={current === "fillings"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${ingredientsStyle.list} custom-scroll`}>
        {categories.map(category => (
          <IngredientsCategory
            key={category.type}
            category={category}
            ingredients={ingredients}
          />
        ))}
      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: arrayOfIngredientsTypes
  
};

export default BurgerIngredients;
