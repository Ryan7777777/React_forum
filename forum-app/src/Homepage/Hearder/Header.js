import React from 'react';
import './Header.css';
import {Nav,Navbar,Button} from 'react-bootstrap';
import logo from '../../Image/logo/blog-icon.png';
import {userService} from "../../_services/user.service.js"
class Header extends React.Component{
    toggle = () => {
        this.props.toggleModal();
    }
    logout = () => {
        var a = userService.logout();
        if (a.status === 200){
            window.location.reload(false);
        }
    }
    renderAuthButton = ()=>{
        if(localStorage.login === "true"){
          return <Button className="col-3 col-md-1 log_btn"size="sm"variant="outline-secondary" onClick={this.logout} >Log Out</Button>
        } else{
          return <Button className="col-3 col-md-1 log_btn"size="sm"variant="outline-secondary" onClick={this.toggle} >Log In</Button>
        }
      }
    render(){
        return (
        <div>
         <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <img src={logo} width="30" height="30" alt="React Bootstrap logo"/>
            </Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            {this.renderAuthButton()}
            </Navbar>
        </div>
        )
    }
}

export default Header;
