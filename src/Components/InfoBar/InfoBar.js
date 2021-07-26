<<<<<<< HEAD
import User from "./User";
import Search from "./Search";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import SignUp from "./SignUp";
import Login from "./Login";
import "../../styles/signUp-login.css";
import $ from "jquery";

const InfoBar = () => {
  const handleSignUpClick = () => {
    $("#overlay").fadeIn(200, function () {
      $("#box").animate({ top: "200px" }, 200);
    });
  };

  const handleLoginClick = () => {
    $("#overlay_1").fadeIn(200, function () {
      $("#box_1").animate({ top: "200px" }, 200);
    });
  };

  return (
    <div>
      <button onClick={handleSignUpClick} className="singup-icon">
        Signup
      </button>
      <button onClick={handleLoginClick} className="login-icon">
        LogIn
      </button>
      <SignUp />
      <Login />
      <Search />
      <User />
      <BurgerMenu />
    </div>
  );
};

export default InfoBar;
=======
import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import User from './User'
import Search from './Search'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import logo from '../../images/logo.png';
import './styles/infobar.css'
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

const InfoBar = () => {
   
    return (
        <div id="navbar-sidebar">
            
            <BurgerMenu />
           
        </div>
    );
};


export default InfoBar;

{/* <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>
  </div>
</nav>
<div class="collapse" id="navbarToggleExternalContent">
  <div class="bg-light shadow-3 p-4">
    <button class="btn btn-link btn-block border-bottom m-0">Link 1</button>
    <button class="btn btn-link btn-block border-bottom m-0">Link 2</button>
    <button class="btn btn-link btn-block m-0">Link 3</button>
  </div>
</div> */}
>>>>>>> master
