import React from "react";
import dragIngredient from "./draggable-ingredients.module.css";
import PropTypes from "prop-types";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  removeFilling,
  swapFilling,
} from "../../../services/actions/burger-constructor";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { itemTypes } from "../../../utils/constns";

const DraggableIngredients = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const deleteIngredient = (uniqueId) => {
    dispatch(removeFilling(uniqueId));
  };

  const [,drop] = useDrop({
    accept: "item",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      dispatch(swapFilling(dragIndex, hoverIndex, item));
      item.index = hoverIndex;
    },
  });

  const [,drag] = useDrag({
    type: "item",
    item: { ...item, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      className={`${dragIngredient.item} mt-4 pr-5`}
      key={item.uniqueId}
      ref={ref}
      draggable
    >
      <DragIcon />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(item.uniqueId)}
      />
    </li>
  );
};

DraggableIngredients.propTypes = {
  item: itemTypes,
  index: PropTypes.number.isRequired,
};

export default DraggableIngredients;
