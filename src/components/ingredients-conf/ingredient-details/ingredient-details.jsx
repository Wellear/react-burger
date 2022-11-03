import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector(store => store.burgeringredients.ingredients);
  const item = ingredients.find((item) => item._id === id);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (history.action === "POP")
      history.replace({ pathname: location.pathname });
  }, [location.pathname, history]);

  if (!item) {
    return null;
  }

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

export default IngredientDetails;
