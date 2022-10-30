import React from "react";
import itemStyle from "./ingredient.module.css";
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { itemTypes } from "../../../utils/constns";
import { useDispatch, useSelector } from "react-redux";

import { setModal } from "";

import { Link, useLocation } from "react-router-dom";

const IngredientsItem = ({ item }) => {
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleIngredientDetailsModal = () => {
    dispatch(setModal({ item, content: "ingredient" }));
  };

  const counter = useMemo(
    () => (count = 0) => {
      count =
        bun._id === item._id && bun
          ? 2
          : ingredients.filter((ingredient) => ingredient._id === item._id)
              .length;
      return count;
    },
    [bun, ingredients, item._id]
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...item },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link
      to={{
        pathname: `/ingredients/${item._id}`,
        state: { background: location },
      }}
      className={itemStyle.link}
      item={item}
    >
      <li
        className={`${itemStyle.item} mb-8`}
        onClick={handleIngredientDetailsModal}
        ref={dragRef}
        draggable
      >
        <img src={item.image} alt={item.name} />
        <div className={`${itemStyle.price} mt-2`}>
          <p className="text text_type_digits-default mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${itemStyle.caption} text text_type_main-default mt-2`}>
          {item.name}
        </p>
        {counter() > 0 && <Counter count={counter()} size="default" />}
      </li>
    </Link>
  );
};

IngredientsItem.propTypes = {
  item: itemTypes,
};

export default IngredientsItem;
