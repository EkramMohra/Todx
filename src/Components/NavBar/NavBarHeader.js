import React from "react";
import './styles/navbar.css';
import logo from "../../images/logo.png";

//import icons from react icons
import {FiMenu} from "react-icons/fi";

const NavBarHeader = (props) => {
  return (
    <div className="logotext header">
        <img src={logo} alt="logo" className="logo-style" />
        <FiMenu onClick={props.menuIconClick} className="burger-menu-icon" />
    </div>
  );
};

export default NavBarHeader;
