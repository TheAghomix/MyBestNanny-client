import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "./Navbar";
import shoppingItems from "../Data/shoppingItems";
import CartItem from "./CartItem";
import { createOrder } from "../redux/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import "./NannyProfile.css";
import { CartOutline } from "react-ionicons";

const NannyProfile = (match) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authR.userData);
  const searchResultData = useSelector(
    (state) => state.searchReducer.searchResultData
  );
  const selectedNanny = searchResultData.filter(
    (el) => el._id === match.match.params.nanny_id
  )[0];
  const handleOrder = () => {
    // const nanny_id = match.match.params.nanny_id;
    // CALENDAR API for date
    dispatch(
      createOrder({
        parent_id: userData._id,
        nanny_id: match.match.params.nanny_id,
        orderDate: orderDate,
        productsPurchased: currentShoppingItems,
        totalPrice: totalPrice + selectedNanny.pricing,
      })
    );

    history.replace("/parent/dashboard");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    currentShoppingItems.length === 0 && setCurrentShoppingItems(shoppingItems);
  };
  const [currentShoppingItems, setCurrentShoppingItems] = useState([]);
  const totalPriceArray = currentShoppingItems.map((el) => {
    let sum = 0;
    sum += Number(el.totalPrice);
    return sum;
  });
  const totalPrice =
    totalPriceArray.length !== 0 && totalPriceArray.reduce((pv, cv) => pv + cv);
  const date = new Date();

  const currentDate = date.toLocaleDateString("sv-SE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [orderDate, setOrderDate] = useState(currentDate);

  return (
    <>
      <Navbar button1="Edit profile" button2="Logout" />

      <div className="profileContainer">
        <div className="nannyInfoContainer">
          <img
            width="200"
            height="auto"
            src={selectedNanny.image}
            alt={selectedNanny.fullName}
            className="nannyPic"
          />
          <div className="nannyInfo">
            <h3>
              <strong> Full Name: </strong>
              {selectedNanny.fullName}
            </h3>
            <p>
              <strong>City: </strong>
              {selectedNanny.city}
            </p>
            <p>
              <strong>Pricing: </strong> ${selectedNanny.pricing}
            </p>
            <p>
              <strong>Age: </strong>
              {selectedNanny.age}
            </p>
          </div>
        </div>
        <button className="offcanvasBtn" onClick={handleShow}>
          Browse our items <span>🡺</span>
        </button>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart Items</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="shoppingCartBody">
              <p style={{ alignSelf: "center" }}>
                Total: $ {totalPrice ? totalPrice : 0}{" "}
              </p>
              {currentShoppingItems.map((el) => (
                <CartItem
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  price={el.price}
                  qty={el.qty}
                  totalPrice={el.totalPrice}
                  currentShoppingItems={currentShoppingItems}
                  setCurrentShoppingItems={setCurrentShoppingItems}
                />
              ))}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="orderTypes">
          <div className="orderComponents">
            <h4> Order by phone: &nbsp; </h4>
            <p>
              call us at{" "}
              <span
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  fontSize: "1.2rem",
                }}
              >
                {selectedNanny.phone}
              </span>
            </p>
          </div>
          <span>or</span>
          <div className="orderComponents">
            <button className="orderBtn" onClick={handleOrder}>
              Place an order
            </button>
            <span>&nbsp; At&nbsp;</span>
            <input
              type="date"
              value={orderDate}
              min={currentDate}
              max="2023-09-22"
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
        </div>
        {/* <p>Your Cart is filled with : {}</p> */}
        {currentShoppingItems.length !== 0 && (
          <div className="outerShoppingCart">
            <div style={{ textAlign: "center" }}>
              <CartOutline color={"#00000"} height="80px" width="80px" />
            </div>
            <p>
              Your Total shopping cart price is :<strong> ${totalPrice}</strong>
            </p>
            <>
              <strong> Purchased products are :</strong>
              {currentShoppingItems.map((el) => (
                <ul key={el.id}>
                  <li>
                    <span> {el.qty}</span>
                    <span> {el.title}</span>
                    <span> for ${el.totalPrice}</span>
                  </li>
                </ul>
              ))}
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default NannyProfile;
