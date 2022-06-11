import React from "react";
import "./LoadingOrders.css";

const LoadingOrders = () => {
  return (
    <div className="orderCardSkeleton">
      <div className="orderDateSkeleton"></div>
      <div className="gridItems">
        <div className="gridSide">
          <p className="dataPlaceHolder">test</p>
          <p className="dataPlaceHolder"> test</p>
          <p className="dataPlaceHolder"> test</p>
        </div>
        <div className="gridSide">
          <p className="dataPlaceHolder">test</p>
          <p className="dataPlaceHolder"> test</p>
          <p className="dataPlaceHolder">test</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOrders;
