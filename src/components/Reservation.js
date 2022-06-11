import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../redux/orderReducer";
import "./Reservation.css";
import babyDrawing from "../Data/babyDrawing.png";
const Reservation = (props) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.authR.userData.type);
  const targetType = userType === "parent" ? "Nanny" : "Parent";

  const deleteOrderHandler = () => {
    const _id = props.id;
    dispatch(deleteOrder({ _id }));
  };
  return (
    <div className="orderCard">
      <button className="orderRemover" onClick={deleteOrderHandler}>
        <img
          className="deleteOrderButton"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Crystal_Clear_action_button_cancel.svg"
          alt="Cancel this Order"
          width="30px"
        />
      </button>

      <h5 className="orderDate">
        Date of Order:{" "}
        {props.orderDate.substring(0, 10).split("-").reverse().join("/")}
      </h5>
      <div className="targetData">
        <p>
          <strong>{`${targetType}'s name`} : </strong>
          {props.targetData.fullName}
        </p>
        <p>
          <strong>{`${targetType}'s city`} : </strong>
          {props.targetData.city}
        </p>
        <p>
          <strong>{`${targetType}'s phone`} : </strong>
          {props.targetData.phone}
        </p>
        <p>
          <strong>Price: </strong>${props.totalPrice}
        </p>
      </div>

      {props.productsPurchased.length !== 0 ? (
        <div className="productsOrdered">
          <strong> purchasedProducts :</strong>
          {props.productsPurchased.map((el) => (
            <p className="oneProductOrdered" key={el._id}>
              {el.title}
            </p>
          ))}
        </div>
      ) : (
        <img
          className="productsOrderedAlt"
          src={babyDrawing}
          alt="babyDrawing"
        />
      )}
    </div>
  );
};

export default Reservation;
