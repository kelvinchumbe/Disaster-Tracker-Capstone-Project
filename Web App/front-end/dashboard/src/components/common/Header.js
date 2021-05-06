import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img
          src="../../assets/Disaster Tracker Logo.png"
          alt=""
          className="header-logo"
        />
      </Link>

      <div className="header-nav">
        <h6 className="header-item">DASHBOARD</h6>
      </div>
    </div>
  );
};

export default Header;
