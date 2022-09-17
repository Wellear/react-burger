import React from "react";
import ingredientInfoStyles from "./ingredient-info.module.css";
import PropTypes from "prop-types";

const IngredientInfo = ({ info, children }) => {
  return (
    <li className={ingredientInfoStyles.info}>
      <p className="text mb-2">{children}</p>
      <p className="text text_type_digits-default">{info}</p>
    </li>
  );
};

IngredientInfo.propTypes = {
  info: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};

export default IngredientInfo;
// ?????????????????????