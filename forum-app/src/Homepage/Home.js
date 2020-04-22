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
        this.slideRef = React.createRef();
        this.state = {
            user_Id: "",
            user_token: "",
            loginModal: false,
            sildebar: false,
            memberModal: undefined
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
        this.setState({memberModal:!this.state.memberModal})
        if(this.state.memberModal === false){
            this.closeSidlebar();
        }
    }
    closeSidlebar = ()=>{
        if(this.state.sildebar===true){
            this.setState({sildebar: false})
            document.getElementById('slidebar').style.width="0%";
        }
    }
    renderMemberPage = ()=>{
        if(localStorage.login === "true"){
            return(<Member show_MemberModal = {this.state.memberModal} toggleMemberModal={this.toggleMemberModal} user_id={this.state.user_id}/>)
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
                    <Login show_LoginModal = {this.state.loginModal} toggleLoginModal={this.toggleLoginModal} login={this.state.login}/>
                    {this.renderMemberPage()}
                    <SideNav show_slide = {this.state.slidebar} toggleLoginModal={this.toggleLoginModal} toggleMemberModal={this.toggleMemberModal} />
                </div>
            </div>
        )
    }
}

export default Home;
