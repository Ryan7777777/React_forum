import React from 'react';
import './Home.css';
import Hearder from "./Hearder/Header.js"
import Body from './Body/Body.js';
import Login from './Login/Login.js';
class Home extends React.Component{
    constructor(prop){
        super(prop)
        this.state = {
            user_Id: "",
            user_token: "",
            show: false,
        }
    }
    toggleModal = () => {
        this.setState({show : !this.state.show})
    }
    render(){
        return(
            <div>
                <Hearder toggleModal={this.toggleModal} />
                <Login show_d = {this.state.show} toggleModal={this.toggleModal} login={this.state.login}/>
                <Body/>
            </div>
        )
    }
}

export default Home;
