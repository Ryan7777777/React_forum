import React from 'react';
import './Home.css';
import Hearder from "./Hearder/Header"
import SideNav from "./SiderNav/SideNav";
import Body from './Body/Body';
import Login from './Login/Login';
import Member from "./Member/Member";
import NewPost from './NewPost/NewPost';
class Home extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            loginModal: false,
            sildebar: false,
            memberModal: false,
            newpostModal: false
        }
    }
    toggleLoginModal = () => {
        if(localStorage.login === 'false')
        this.setState({loginModal : !this.state.loginModal})
    }
    toggleSidlebar = () =>{
        if(this.state.sildebar===false){
            this.setState({sildebar: true})
            document.getElementById('slidebar').style.width="300px";
            document.getElementById('dimlayer').style.width="1280px";
        }
    }
    toggleMemberModal = () =>{
        this.setState({memberModal:!this.state.memberModal})
    }
    toggleNewPostModal = () =>{
        this.setState({newpostModal:!this.state.newpostModal})
    }
    closeSidlebar = ()=>{
        if(this.state.sildebar===true){
            this.setState({sildebar: false})
            document.getElementById('slidebar').style.width="0px";
            document.getElementById('dimlayer').style.width="0px";
        }
    }
    renderMemberPage (){
        if(this.state.memberModal === true){
            return(<Member showMemberModal ={this.state.memberModal} toggleMemberModal={this.toggleMemberModal} />)
        } 
    }
    renderLoginPage (){
        if(this.state.loginModal ===true){
            return(<Login show_LoginModal = {this.state.loginModal} toggleLoginModal={this.toggleLoginModal} login={this.state.login}/>)
        }
    }
    renderNewPostModal (){
        if(this.state.newpostModal === true){
            return(<NewPost show_NewPostModal ={this.state.newpostModal} toggleNewPostModal={this.toggleNewPostModal}/>)
        }
    }
    render(){
        return(
            <div>
                <div className='dimlayer' id='dimlayer' onClick={this.closeSidlebar}></div>
                <div className = "mainPage" id="mainpage" onClick ={this.closeSidlebar}>
                    <Hearder toggleSidlebar={this.toggleSidlebar} toogleMember={this.toggleMemberModal}/>
                    <Body/>
                </div>
                <div className="slidewrapper" id="slidebar">
                    {this.renderLoginPage()}
                    {this.renderMemberPage()}
                    {this.renderNewPostModal()}
                    <SideNav show_slide = {this.state.slidebar} toggleLoginModal={this.toggleLoginModal} toggleMemberModal={this.toggleMemberModal} toggleNewPostModal={this.toggleNewPostModal} toggleNewPostModal={this.toggleNewPostModal}/>
                </div>
            </div>
        )
    }
}

export default Home;
