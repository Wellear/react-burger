import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import constructorStyle from "./burger-constructor.module.css";
import { renderOrder } from "../../../services/actions/order-details";
import {
  addBun,
  addFilling,
} from "../../../services/actions/burger-constructor";
import { nanoid } from "nanoid";
import { useDrop } from "react-dnd";
import DraggableIngredients from "../../ingredients-conf/draggable-ingredients/draggable-ingredients";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const [totalPrice, setTotalPrice] = useState(0);
  const orderId = useMemo(() => ingredients.map((item) => item._id), [
    ingredients,
  ]);

  useEffect(() => {
    const total = ingredients.reduce(
      (sum, item) => sum + item.price,
      bun.length !== 0 ? bun.price * 2 : 0
    );
    setTotalPrice(total);
  }, [bun, ingredients]);

  const handleOrderDetailssModal = () => {
    dispatch(renderOrder(orderId));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item) => {
    const uniqueId = nanoid();
    item.type !== "bun"
      ? dispatch(addFilling(item, uniqueId))
      : dispatch(addBun(item, uniqueId));
  };

  return (
    <section className={`${constructorStyle.section} ml-10 mt-20`}>
      <div className={constructorStyle.constructor_container} ref={dropTarget}>
        {bun.length === 0 ? (
          <p className="text text_type_main-default">Выберите булку</p>
        ) : (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        {ingredients.length === 0 ? (
          <p className="text text_type_main-default">Выберите начинку</p>
        ) : (
          <ul className={`${constructorStyle.list} custom-scroll`}>
            {ingredients.map((item, index) => {
              return (
                <DraggableIngredients
                  item={item}
                  index={index}
                  key={item.uniqueId}
                />
              );
            })}
          </ul>
        )}

        {bun.length === 0 ? (
          <p className="text text_type_main-default">Выберите булку</p>
        ) : (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <div className={`${constructorStyle.total} mt-10 mr-8`}>
        <div className={`${constructorStyle.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon />
        </div>
        {totalPrice === 0 ? (
          ""
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={handleOrderDetailssModal}
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
