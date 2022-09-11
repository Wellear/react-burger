import AppHeader from "../app-header/app-header";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-conf/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-conf/burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/API";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { resetModal } from "../../services/actions/modal";
import { useDispatch, useSelector } from "react-redux";
import { renderIngredients } from "../../services/actions/burger-ingredients";
import OrderDetails from "../order-conf/order-details/order-details";

const App = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading, hasError } = useSelector(
    (store) => store.burgerIngredients
  );
  const { isModalOpen, data, type } = useSelector((store) => store.modal);
  const info = useSelector((store) => store.order.info);

  useEffect(() => {
    dispatch(renderIngredients());
  }, [dispatch]);

  const handleCloseIngredientModal = () => {
    dispatch(resetModal());
  };

  return (
    <div className={`${styles.app} custom-scroll app-container`}>
      <AppHeader />
      <main className={styles.content}>
        {isLoading && "Загрузка..."}
        {hasError && "Произошла ошибка"}
        {!isLoading && !hasError && ingredients.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={handleCloseIngredientModal}>
          {type === "ingredient" ? (
            <IngredientDetails item={data} />
          ) : (
            <OrderDetails orderData={info} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;
