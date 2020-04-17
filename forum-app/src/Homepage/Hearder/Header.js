import React from 'react';
import './Header.css';
import {Nav,Navbar, NavItem,Image,Tooltip,Button,OverlayTrigger} from 'react-bootstrap';
import logo from '../../Image/logo/blog-icon.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {userPhotoService} from "../../_services/userphoto.service.js";
import $ from 'jquery';
class Header extends React.Component{
    constructor(props){
        super(props)
        
    }
    toggleSidebar = () =>{
        this.props.toggleSidlebar();
    }
    toggleMemberModal = () =>{
        this.props.toogleMember();
    }
    refresh = () =>{
        window.location.reload(false);
    }
    getUserImage = () =>{
        var res = userPhotoService.getUserPhoto(localStorage.userId)
        return (res.responseText)
    }
    componentDidMount(){
        if(localStorage.login === 'true'){
            userPhotoService.getUserPhoto(localStorage.userId)
        }
    }
    renderUserIcon = () =>{
        if(localStorage.login === 'true'){
            return(<>
                <OverlayTrigger
                 key={'bottom'}
                    placement={'bottom'}
                    overlay={
                 <Tooltip id={'userIconTooltip'}>
                User's Info
                </Tooltip>
                }
                >
                <Image className="userImage" id="img" roundedCircle onClick={this.toggleMemberModal}/>
                </OverlayTrigger>{' '}
                </>)
        } else{
            return<div></div>
        }
    }
    render(){
        return (
        <div>
         <Navbar bg="light" expand="lg" className="mr-auto">
             <Nav className="mr-auto">
             <NavItem>
                <FontAwesomeIcon className="bar-icon" icon={faBars} onClick={this.toggleSidebar}/>
            </NavItem>
            <Nav.Item>
                <img className="logo" src={logo} alt="React Bootstrap logo" onClick={this.refresh}/>
            </Nav.Item>
             </Nav>
           {this.renderUserIcon()}
        </Navbar>
        </div>
        )
    }
}

export default Header;
