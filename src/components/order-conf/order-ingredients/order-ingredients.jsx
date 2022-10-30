import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientImage from "../../ingredients-conf/ingredients-image/ingredients-image";
import styles from "./order-ingredients.module.css";

const OrderIngredient = ({ item, count }) => {
  return (
    <li className={`${styles.item} mr-6 mb-4`}>
      <div className={styles.container}>
        <IngredientImage image={item.image} alt={item.name} />
        <p className="text text_type_main-default pl-4">{item.name}</p>
      </div>
      <div className={styles.container}>
        <p className="text text_type_digits-default pr-4">
          {count} x {count * item.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
};

export default OrderIngredient;
