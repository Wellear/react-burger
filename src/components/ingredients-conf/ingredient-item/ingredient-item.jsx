import { useState } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { itemTypes } from "../../../utils/constns";
import IngredientDetails from "../ingredient-details/ingredient-details";
import itemStyle from './ingredient.module.css';

const IngredientsItem = ({ item }) => {
  const [isIngredientDetailsModalOpen, setIngredientDetailsModal] =
    useState(false);

  const handleIngredientDetailsModal = () => {
    setIngredientDetailsModal(true);
  };

  return (
    <li
      className={`${itemStyle.item} mb-8`}
      onClick={handleIngredientDetailsModal}
    >
      <img src={item.image} alt={item.name} />
      <div className={`${itemStyle.price} mt-2`}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${itemStyle.caption} text text_type_main-default mt-2`}>
        {item.name}
      </p>
      <Counter count={1} size="default" />
      <IngredientDetails
        isOpen={isIngredientDetailsModalOpen}
        handleClose={setIngredientDetailsModal}
        item={item}
      />
    </li>
  );
};

IngredientsItem.propTypes = {
  item: itemTypes
};

export default IngredientsItem;
