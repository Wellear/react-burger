import React from "react";
import PropTypes from "prop-types";
import orderDetailsStyles from "./order-details.module.css";
import orderAcceptedIcon from "../../../images/order-accepted.svg";

const OrderDetails = ({ orderData }) => {
  return (
    <div className={`${orderDetailsStyles.container} pt-30 pb-30`}>
      <p className="text text_type_digits-large mb-8">
        {orderData.order.number}
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img
        src={orderAcceptedIcon}
        alt="Заказ принят"
        className={`${orderDetailsStyles.image} mb-15`}
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    success: PropTypes.bool.isRequired,
    order: PropTypes.shape({
      number: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default OrderDetails;
