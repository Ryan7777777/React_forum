import React from 'react';
import "./Body.css";
import  Post  from "./Post/Post";
import Comment from './Comment/Comment';
class Body extends React.Component {
    constructor(props){
        super(props)
        this.state = {postId:null}
    }
    shouldComponentUpdate() {
        return true;
    }
    reportError = () => {
        this.props.error()
    }
    renderComment(){
        if(this.state.postId !== null){
            return (<Comment comment_Id = {this.state.postId}/>)
        }
    }
    openNewPost = (newPostId) =>{
        this.setState({postId:newPostId})
    }
    render(){
        return (
            <div className = "bodyWrapper">
               <Comment postId = {this.state.postId}/>
                <Post newPostId={this.openNewPost}/>
            </div>)
    }
}
export default Body;