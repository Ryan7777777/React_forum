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
    toggleModal = () => {
        this.props.toggleModal();
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
    renderLoginButton = ()=>{
        if(localStorage.login === "true"){
          return(<div className ="login" onClick={this.logout}><a>Log out</a></div>)
        } else{
          return(<div className ="login" onClick={this.toggleModal}><a>Log In</a></div>)
        }
      }
    renderMemberPageRegisterButton = () =>{
        if(localStorage.login === "true"){
            return(<div className ="memberbutton" onClick={this.logout}><a>Account deails</a></div>)
          } else{
            return(<div className ="register" onClick={this.register}><a>Register</a></div>)
          }
    }
    render(){
        return(
            <div id="slidebar">
                <div className="menu">
                    <div className='brand'>
                        <img  className="logo" src={logo}></img>
                        <a>Name</a>
                    </div>
                    <div className="top">
                        <form className = "inputcontainer">
                            <FontAwesomeIcon  className="searchIcon" icon={faSearch}/>
                            <input className="input" placeholder="search"></input>
                        </form>
                        {this.renderLoginButton()}
                        {this.renderMemberPageRegisterButton()}
                        <div className ="history"><a>History</a></div> 
                    </div>
                </div>
             </div>
    )}
}
export default SideNav;