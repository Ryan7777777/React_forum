import React from 'react';
import './Home.css';
import Hearder from "./Hearder/Header.js"
import SideNav from "./SiderNav/SideNav.js";
import Body from './Body/Body.js';
import Login from './Login/Login.js';
import Member from "./Member/Member.js";
class Home extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            loginModal: false,
            sildebar: false,
            memberModal: false
        }
    }
    toggleLoginModal = () => {
        this.setState({loginModal : !this.state.loginModal})
    }
    toggleSidlebar = () =>{
        if(this.state.sildebar===false){
            this.setState({sildebar: true})
            document.getElementById('slidebar').style.width="250px";
        }
    }
    toggleMemberModal = () =>{
        if (localStorage.login === "true"){
            console.log(this.state.memberModal)
            this.setState({memberModal:!this.state.memberModal})
        }
    }
    closeSidlebar = ()=>{
        if(this.state.sildebar===true){
            this.setState({sildebar: false})
            document.getElementById('slidebar').style.width="0px";
        }
    }
    renderMemberPage = ()=>{
        if(localStorage.login === "true" &&  this.state.memberModal === true){
            return(<Member showMemberModal ={this.state.memberModal} toggleMemberModal={this.toggleMemberModal} />)
        } 
    }
    renderLoginPage = ()=>{
        if(localStorage.login === 'false'){
            return(<Login show_LoginModal = {this.state.loginModal} toggleLoginModal={this.toggleLoginModal} login={this.state.login}/>)
        }
    }
    render(){
        return(
            <div>
                <div className = "mainpage" onClick ={this.closeSidlebar}>
                    <Hearder toggleSidlebar={this.toggleSidlebar} toogleMember={this.toggleMemberModal}/>
                    <Body/>
                </div>
                <div className="slidewrapper" id="slidebar">
                    {this.renderLoginPage()}
                    {this.renderMemberPage()}
                    <SideNav show_slide = {this.state.slidebar} toggleLoginModal={this.toggleLoginModal} toggleMemberModal={this.toggleMemberModal} />
                </div>
            </div>
        )
    }
}

export default Home;
