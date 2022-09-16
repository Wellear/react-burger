import React from "react";
import ingredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../../ingredients-conf/ingredients-category/ingredients-category";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("buns");
  const [bunsRef, bunsInView] = useInView({ threshold: 0.1 });
  const [saucesRef, saucesInView] = useInView({ threshold: 0.1 });
  const [fillingsRef, fillingsInView] = useInView({ threshold: 0.1 });

  const handleScroll = () => {
    switch (true) {
      case bunsInView:
        setCurrent("buns");
        break;
      case saucesInView:
        setCurrent("sauces");
        break;
      case fillingsInView:
        setCurrent("fillings");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleScroll();
  }, [bunsInView, saucesInView, fillingsInView]);

  return (
    <section className={ingredientsStyle.section}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={ingredientsStyle.tab}>
        <Tab value="buns" active={current === "buns"}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === "sauces"}>
          Соусы
        </Tab>
        <Tab value="fillings" active={current === "fillings"}>
          Начинки
        </Tab>
      </div>
      <ul className={`${ingredientsStyle.list} custom-scroll`}>
        <div ref={bunsRef}>
          <IngredientsCategory
            key={"buns"}
            category={{ type: "bun", name: "Булки" }}
          />
        </div>
        <div ref={saucesRef}>
          <IngredientsCategory
            key={"sauces"}
            category={{ type: "sauce", name: "Соусы" }}
          />
        </div>
        <div ref={fillingsRef}>
          <IngredientsCategory
            key={"fillings"}
            category={{ type: "main", name: "Начинки" }}
          />
        </div>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
