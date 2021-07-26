import React, { useState } from "react";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle , FiMenu} from "react-icons/fi"
import { RiPencilLine } from "react-icons/ri"
import { BiCog } from "react-icons/bi"
import User from '../User'
import Search from '../Search'
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/infobar.css";
import logo from '../../../images/logo.png';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";


const BurgerMenu = () => {
    const [menuCollapse, setMenuCollapse] = useState(true)

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    }

    return (
        <>
        <div className="logotext header">
            <FiMenu onClick={menuIconClick} className="burger-menu-icon"/>
            <img src={logo} alt="logo" className="logo-style"/>
            <Search />
            <User />
        </div>
        <div id="sidebar-style">
            <ProSidebar collapsed={menuCollapse}>
                <SidebarHeader>

                <div className="closemenu" onClick={menuIconClick}>
                    {/* changing menu collapse icon on click */}
                {/* {menuCollapse ? (
                    <FiArrowRightCircle/>
                ) : (
                    <FiArrowLeftCircle/>
                )} */}
                </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                    <MenuItem active={true} icon={<FiHome />}>{menuCollapse ? null : "Home" } </MenuItem>
                    <MenuItem icon={<FaList />}>{menuCollapse ? null : "Active" }</MenuItem>
                    <MenuItem icon={<FaRegHeart />}>{menuCollapse ? null : "Link12" }</MenuItem>
                    <MenuItem icon={<RiPencilLine />}> {menuCollapse ? null : "Link12" }</MenuItem>
                    <MenuItem icon={<BiCog />}> {menuCollapse ? null : "Settings" } </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                    <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
        </>
    );
};


export default BurgerMenu;


// <Nav defaultActiveKey="/home" as="ul">
//                 <Nav.Item as="li">
//                     <Nav.Link href="/home">Active</Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item as="li">
//                     <Nav.Link eventKey="link-1">Link12</Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item as="li">
//                     <Nav.Link eventKey="link-2">Link12</Nav.Link>
//                 </Nav.Item>
//             </Nav>