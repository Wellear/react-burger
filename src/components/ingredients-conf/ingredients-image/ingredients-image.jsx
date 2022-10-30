import React from "react";
import styles from "../ingredients-image/ingredients-image.module.css";

const IngredientImage = ({ image, alt }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={image} alt={alt} className={styles.image} />
    </div>
  );
};

export default IngredientImage;
