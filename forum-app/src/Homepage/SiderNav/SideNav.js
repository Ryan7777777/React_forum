import React from 'react';
import './SideNav.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../Image/logo/blog-icon.png';
import {userService} from "../../_services/user.service.js"
class SideNav extends React.Component{
    constructor(props){
        super(props)
        this.state = {search:''};
    }
    toggleLoginModal = () => {
        this.props.toggleLoginModal();
    }
    logout = () => {
        var a = userService.logout();
        if (a.status === 200){
            window.location.reload(false);
        }
    }
    register = () =>{
        window.open("/signup/", '_blank');
    }
    toggleMemberModal = () =>{
        this.props.toggleMemberModal();
    }
    renderLoginButton = ()=>{
        if(localStorage.login === "true"){
          return(<div className ="login" onClick={this.logout}>Log out</div>)
        } else{
          return(<div className ="login" onClick={this.toggleLoginModal}>Log In</div>)
        }
      }
    renderMemberPageRegisterButton = () =>{
        if(localStorage.login === "true"){
            return(<div className ="memberbutton" onClick={this.toggleMemberModal}>Account deails</div>)
          } else{
            return(<div className ="register" onClick={this.register}>Register</div>)
          }
    }
    render(){
        return(
            <div id="slidebar">
                <div className="menu">
                    <div className='brand'>
                        <img  className="logo" src={logo} alt="logo_image"></img>
                        <p>Name</p>
                    </div>
                    <div className="top">
                        <form className = "inputcontainer">
                            <FontAwesomeIcon  className="searchIcon" icon={faSearch}/>
                            <input className="input" placeholder="search"></input>
                        </form>
                        {this.renderLoginButton()}
                        {this.renderMemberPageRegisterButton()}
                        <div className ="history">History</div> 
                    </div>
                </div>
             </div>
    )}
}
export default SideNav;