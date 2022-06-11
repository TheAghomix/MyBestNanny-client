import React, { useState, useEffect } from "react";
import "./NannyProfile.css";
import { TrashBinOutline } from "react-ionicons";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.qty);
  const handlechange = (e) => {
    e.preventDefault();
    setQty(e.target.value);
    if (qty < 1) {
      setQty(1);
    }
  };
  const removeItem = () => {
    let newShoppingItems = props.currentShoppingItems.filter(
      (el) => el.id !== props.id
    );
    props.setCurrentShoppingItems(newShoppingItems);
  };

  useEffect(() => {
    let newShoppingItems = props.currentShoppingItems.map((el) => {
      if (el.id === props.id) {
        return { ...el, totalPrice: el.price * qty, qty: qty };
      } else {
        return el;
      }
    });
    props.setCurrentShoppingItems(newShoppingItems);
  }, [qty]);

  return (
    <div className="cartItem">
      <input
        className="cartQty"
        value={qty}
        onChange={handlechange}
        min={1}
        type="number"
      />
      <p className="cartTitle">{props.title}</p>
      <p className="cartPrice">${props.totalPrice}</p>
      <TrashBinOutline
        color={"#00000"}
        height="40px"
        width="40px"
        onClick={removeItem}
        className="cartRm"
      />
    </div>
  );
};

export default CartItem;
