import React from "react";
import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-conf/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-conf/burger-constructor/burger-constructor";
import Modal from "../modal-conf/modal/modal";
import IngredientDetails from "../ingredients-conf/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { renderIngredients } from "../../services/actions/burger-ingredients";
import OrderDetails from "../burger-constructor/order-details/order-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { resetModal } from "../../services/slices/modal";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/registration/registration";
import ForgotPasswordPage from "../../pages/forgot-pass/forgot-pass";
import ResetPasswordPage from "../../pages/reset-pass/reset-pass";
import ProfilePage from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import { getUserAction, updateTokenAction } from "../../services/actions/auth";
import NotFound from "../../pages/not-found/not-found";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../order-conf/order-info/order-info";
import { getCookie } from "../../utils/cookie";

const App = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading, hasError } = useSelector(
    (store) => store.burgerIngredients
  );
  const { isModalOpen, type } = useSelector((store) => store.modal);
  const info = useSelector((store) => store.orderDetails.info);

  const token = localStorage.getItem("refreshToken");
  const cookie = getCookie("token");

  const location = useLocation();
  const background = location.state?.background;
  const history = useHistory();

  useEffect(() => {
    dispatch(renderIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && token) dispatch(updateTokenAction());
    if (cookie && token) dispatch(getUserAction());
  }, [dispatch, token, cookie]);

  const handleCloseModal = () => {
    dispatch(resetModal());
    history.goBack();
  };

  return (
    <div className={`${styles.app} custom-scroll app-container`}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/registration" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-pass" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-pass" exact>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientDetails />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderInfo />
        </Route>
        <Route path="/" exact>
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
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id" exact>
          <Modal onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
      {background && (
        <ProtectedRoute path="/profile/orders/:id" exact>
          <Modal onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        </ProtectedRoute>
      )}
      {isModalOpen && type !== "ingredient" && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails orderData={info} />
        </Modal>
      )}
    </div>
  );
};

export default App;
/* Не могу решить проблему с токеном. 
 ./src/components/app/app.jsx 53:34
 Module parse failed: Unexpected token (53:34)
 You may need an appropriate loader to handle this file type.
|   var cookie = getCookie("token");
|   var location = useLocation();
>   var background = location.state?.background;
|   var history = useHistory();
|   useEffect(function () { 
*/
