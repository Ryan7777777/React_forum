import React from 'react';
import "./Body.css";
import  Post  from "./Post/Post";
import Comment from './Comment/Comment';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
class Body extends React.Component {
    
    state = {postId:null,postCategory:null}
    reportError = () => {
        this.props.error()
    }
    postOnChange = (value)=> {
        this.setState({postId:value,postCategory:null})
    }
    //cateegory on change postid : null
    
    render(){
        return (
            <div className = "bodyWrapper">
                <Switch>
                <Router path='/comment'>
                    <Comment postId = {this.state.postId}/>
                </Router>
                </Switch>
                <Post  postOnChange={this.postOnChange} postCategory = {this.state.postCategory} />
            </div>)
    }
}
export default Body;