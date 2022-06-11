import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ServiceCard from "./ServiceCard";
import Reservation from "./Reservation";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/orderReducer";
import Switch from "@mui/material/Switch";
import { editProfile } from "../redux/editProfileReducer";
import { getEditedProfileData } from "../redux/editProfileReducer";
import LoadingOrders from "../loading Components/LoadingOrders";
const Dashboard = (props) => {
  const orderData = useSelector((state) => state.orderReducer.orderData);
  const dataChanged = useSelector((state) => state.orderReducer.dataChanged);
  const userDataAfterUpdate = useSelector(
    (state) => state.editProfileReducer.userDataAfterUpdate
  );
  const id = useSelector((state) => state.authR.userData._id);
  const userData = useSelector((state) => state.authR.userData);
  const orderLoading = useSelector((state) => state.orderReducer.status);
  const [checked, setChecked] = useState(userDataAfterUpdate?.availability);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders({ type: props.type, id }));
  }, [dataChanged]);
  useEffect(() => {
    dispatch(getEditedProfileData({ id: userData._id, type: userData.type }));
  }, []);

  useEffect(() => {
    setChecked(userDataAfterUpdate?.availability);
  }, [userDataAfterUpdate]);
  const handleSwitcherChange = (e) => {
    setChecked(e.target.checked);
    const formData = { ...userDataAfterUpdate, availability: e.target.checked };
    dispatch(editProfile({ id: id, type: userData.type, formData }));
  };
  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <div className="orderContainer">
        {orderLoading === "loading" ? (
          <LoadingOrders />
        ) : (
          orderData.map((el) => (
            <Reservation
              key={el.userData._id}
              orderDate={el.userData.orderDate}
              productsPurchased={el.userData.productsPurchased}
              totalPrice={el.userData.totalPrice}
              id={el.userData._id}
              targetData={el.targetData}
            />
          ))
        )}
      </div>
      {props.type === "parent" ? (
        <div className="container">
          <ServiceCard nannyType="NannyIn" />
          <ServiceCard nannyType="NannyOut" />
        </div>
      ) : (
        <div className="availability-status">
          <p>Availability</p>
          <Switch
            checked={checked}
            onChange={handleSwitcherChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
