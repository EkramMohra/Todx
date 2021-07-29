import React, {useState} from "react";
import NavBarSide from "./NavBarSide";
import NavBarHeader from "./NavBarHeader";
import './styles/navbar.css';

const NavBar = (props) => {
  const [menuCollapse, setMenuCollapse] = useState(true)
  const menuIconClick = () => {
      menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <NavBarHeader menuIconClick={menuIconClick} />
      <NavBarSide menuCollapse={menuCollapse} />
    </>
  );
};

export default NavBar;
