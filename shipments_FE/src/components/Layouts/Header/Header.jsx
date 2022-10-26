import React from "react";
import { Outlet } from "react-router-dom";
import deliveryLogo from '../../../assets/delivery_logo.png'

import "./Header.scss";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={deliveryLogo} alt="logo" className="logo" />
      </div>
      <Outlet />
    </>
  );
};

export default Header;
