import React from "react";
import constructorStyle from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderOrder } from "../../../services/actions/order-details";
import { nanoid } from "nanoid";
import { useDrop } from "react-dnd";
import DraggableIngredients from "../../ingredients-conf/draggable-ingredients/draggable-ingredients";
import {
  addBun,
  addFilling,
} from "../../../services/slices/burger-constructor";
import { getCookie } from "../../../utils/cookie";
import { useHistory } from "react-router-dom";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const cookie = getCookie("token");
  const history = useHistory();
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setLoading] = useState(false);
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
    cookie && dispatch(renderOrder(orderId, setLoading));
    !cookie && history.push("/login");
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const dropContainerBorderColor = isHover
    ? "2px solid #4C4CFF"
    : "transparent";

  const onDropHandler = (item) => {
    const uniqueId = nanoid();
    item.type !== "bun"
      ? dispatch(addFilling({ ...item, uniqueId }))
      : dispatch(addBun({ ...item, uniqueId }));
  };

  return (
    <section className={`${constructorStyle.section} ml-10 mt-20`}>
      <div
        className={constructorStyle.constructor_container}
        ref={dropTarget}
        style={{ border: dropContainerBorderColor }}
      >
        {bun.length === 0 ? (
          <p className="text text_type_main-default">Перетащите булку сюда</p>
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
          <p className="text text_type_main-default">Перетащите начинку сюда</p>
        ) : (
          <ul className={`${constructorStyle.list} custom-scroll`}>
            {ingredients.map((item, index) => {
              return (
                <DraggableIngredients
                  item={item}
                  index={index}
                  key={item.uniqueId}
                  style={{ boxShadow: dropContainerBorderColor }}
                />
              );
            })}
          </ul>
        )}

        {bun.length === 0 ? (
          <p className="text text_type_main-default">Перетащите булку сюда</p>
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
        {bun.length === 0 || ingredients.length === 0 || isLoading ? (
          <Button type="primary" size="large" disabled>
            Оформить заказ
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={handleOrderDetailssModal}
          >
            {isLoading ? "Подождите..." : "Оформить заказ"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
