import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import OrderInfo from "../../components/order-conf/order-info/order-info";
import OrderStats from "../../components/order-conf/order-stats/order-stats";
import Orders from "../../components/order-conf/orders/orders";
import {
  wsConnectionClose,
  wsConnectionOpen,
} from "../../services/actions/web-socket-actions";
import styles from "./feed.module.css";

const Feed = () => {
  const dispatch = useDispatch();
  const { wsConnected } = useSelector((store) => store.orders);

  const location = useLocation();
  const background = (location.state && location.state.background) ? location.state.background : "";

  useEffect(() => {
    dispatch(wsConnectionOpen());
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  return (
    <Switch location={background || location}>
      <Route path="/feed/:id" exact>
        <OrderInfo />
      </Route>
      <Route path="/feed" exact>
        {!wsConnected && "Загрузка..."}
        {wsConnected && (
          <section className={styles.container}>
            <h2 className="text text_type_main-large pt-10 pb-5">
              Лента заказов
            </h2>
            <div className={styles.feedContainer}>
              <Orders />
              <OrderStats />
            </div>
          </section>
        )}
      </Route>
    </Switch>
  );
};

export default Feed;
