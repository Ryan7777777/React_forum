import React from 'react';
import './Home.css';
import Hearder from "./Hearder/Header.js"
import Body from './Body/Body.js';
import Login from './Login/Login.js';
import SideNav from "./SiderNav/SideNav.js"
const md = window.matchMedia( "(min-width: 768px)" );
const lg = window.matchMedia( "(min-width: 1200px)" );
class Home extends React.Component{
    constructor(prop){
        super(prop)
        this.slideRef = React.createRef();
        this.state = {
            user_Id: "",
            user_token: "",
            show: false,
            sildebar: false
        }
    }
    toggleModal = () => {
        this.setState({show : !this.state.show})
    }
    toggleSidlebar = () =>{
        if(this.state.sildebar===false){
            this.setState({sildebar: true})
            if(lg.matches){
                document.getElementById('slidebar').style.width="15%";
            }else if(md.matches){
                document.getElementById('slidebar').style.width="25%";
            } else{
                document.getElementById('slidebar').style.width="50%";
            }
        }
    }
    closeSidlebar = ()=>{
        if(this.state.sildebar===true){
            this.setState({sildebar: false})
            document.getElementById('slidebar').style.width="0%";
        }
    }
    render(){
        return(
            <div>
                <div className = "mainbody" onClick ={this.closeSidlebar}>
                    <Hearder toggleSidlebar={this.toggleSidlebar}/>
                    <Login show_d = {this.state.show} toggleModal={this.toggleModal} login={this.state.login}/>
                    <Body/>
                </div>
                <div className="slidewrapper" id="slidebar">
                    <SideNav show_slide = {this.state.slidebar} toggleModal = {this.toggleModal}/>
                </div>
            </div>
        )
    }
}

export default Home;
