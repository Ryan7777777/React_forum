import React from 'react';
import './Header.css';
import {Nav,Navbar,Image,Tooltip,OverlayTrigger} from 'react-bootstrap';
import logo from '../../Image/logo/blog-icon.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {userPhotoService} from "../../_services/userphoto.service.js";
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
    componentDidMount(){
        if(localStorage.login === 'true'){
            userPhotoService.getUserImage(localStorage.userId)
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
                <Image className="userIcon " id="imgLogo" roundedCircle onClick={this.toggleMemberModal}/>
                </OverlayTrigger>{' '}
                </>)
        } 
    }
    render(){
        return (
        <div>
         <Navbar bg="light" expand="lg">
            <FontAwesomeIcon className="bar-icon" icon={faBars} onClick={this.toggleSidebar}/>
            <img className="logo" src={logo} alt="React Bootstrap logo" onClick={this.refresh}/>
            <Nav className="mr-auto"></Nav>
           {this.renderUserIcon()}
        </Navbar>
        </div>
        )
    }
}

export default Header;
