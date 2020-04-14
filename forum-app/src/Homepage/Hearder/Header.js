import React from 'react';
import './Header.css';
import {Nav,Navbar, NavItem} from 'react-bootstrap';
import logo from '../../Image/logo/blog-icon.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
class Header extends React.Component{
    toggleSidebar = () =>{
        this.props.toggleSidlebar();
    }
    refresh = () =>{
        window.location.reload(false);
    }
    render(){
        return (
        <div>
         <Navbar bg="light" expand="lg">
            <NavItem>
                <FontAwesomeIcon className="bar-icon" icon={faBars} onClick={this.toggleSidebar}/>
            </NavItem>
            <Nav.Item>
                <img className="logo" src={logo} alt="React Bootstrap logo" onClick={this.refresh}/>
            </Nav.Item>
            <Nav className="mr-auto">
            </Nav>
        </Navbar>
        </div>
        )
    }
}

export default Header;
