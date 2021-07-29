import React ,{useState} from "react";
import './styles/navbar.css';
import { withRouter } from "react-router";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";

import logo from "../../images/logo.png";

//import icons from react icons
import { BiCog } from "react-icons/bi";
import {
  FiHome,
  FiLogOut,
  FiMenu,
  FiArchive
} from "react-icons/fi";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";


const NavBarSide = (props) => {
    const logout = () => {
        sessionStorage.clear();
        props.history.push(`/`)
    }

    let userId = JSON.parse(sessionStorage.getItem('user'))[0].id

    let channel =`share_task_recevier_id_${userId}`

    return (
    
        <div id="sidebar-style">
            <ProSidebar collapsed={props.menuCollapse}>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={true} icon={<FiHome />}>
                            {props.menuCollapse ? null : "Home"}
                        </MenuItem>
                        {/* {console.log(props.flag)} */}
                        <div className="circle-red"></div> 
                        <MenuItem icon={<FiArchive />}>
                            {props.menuCollapse ? null : "Archived"}
                        </MenuItem>
                        <MenuItem icon={<BiCog />}>
                            {props.menuCollapse ? null : "Settings"}
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                        <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
       
    )
}

export default withRouter(NavBarSide)


