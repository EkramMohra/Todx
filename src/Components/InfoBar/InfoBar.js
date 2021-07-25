import React from 'react';
import Nav from 'react-bootstrap/Nav'
import User from './User'
import Search from './Search'
import BurgerMenu from './BurgerMenu/BurgerMenu'


const InfoBar = () => {

    return (
        <div>
            <Nav defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-1">Link12</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-2">Link12</Nav.Link>
                </Nav.Item>
            </Nav>
            <Search />
            <User />
            <BurgerMenu />
        </div>

    );
};


export default InfoBar;