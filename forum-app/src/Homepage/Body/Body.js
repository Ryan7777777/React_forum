import React from 'react';
import "./Body.css";
import  Post  from "./Post/Post";
import Comment from './Comment/Comment';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
class Body extends React.Component {
    
    state = {postId:null,postCategory:null,postTitle:null}
    reportError = () => {
        this.props.error()
    }
    //cateegory on change postid : null
    postOnChange = (value)=> {
        this.setState({postId:value,postCategory:null})
    }
    componentWillMount(){
        var t = this;
        window.addEventListener('popstate', function(event) {
            var a= window.location.pathname.split('/')
            t.setState({postId:a[2]});
		  });

    }
    render(){
        return (
            <div className = "bodyWrapper">
                <Comment postId = {this.state.postId} />
                <Post  postOnChange={this.postOnChange} postCategory = {this.state.postCategory} />
            </div>)
    }
}
export default Body;