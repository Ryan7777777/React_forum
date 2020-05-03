import React from 'react';
import "./Post.css"
import { postService } from '../../../_services/post.service';
import lastUpdateCalaulater  from "../../../tools/lastupdateCalculater";
import { withRouter } from "react-router-dom";

class Post extends React.Component{
    constructor(props){
        super(props)
        // posts in author:"xxx" date: "2020-04-16T03:11:21.000Z" id: 1 title: "2" format
        this.state={posts:[],error: null,category:null}
    }
    static getDerivedStateFromProps(props,state){
        return{category:props.postCategory}
    }
    componentDidMount () {
        if(this.state)
        postService.loadallpost()
        .then(data=>{
            this.setState({posts: data, error: false})
        })
     }
    redirectToPost = (postId) =>{
        var path ='/comment/'+postId
        this.props.history.push(path)
        this.props.postOnChange(postId)
     }
     renderTopicDialog (){
             return(this.renderPost())
     }
     renderPost (){
      return(
      <div>{this.state.posts.map((post,i) => (
          <div className="postBox" onClick={(e)=>this.redirectToPost(post.id)} key={i}>
            <p className="author">{post.author}</p>
            <p className="date">{lastUpdateCalaulater(post.date)}</p>
            <p className="title">{post.title}</p>
          </div>
         ))}</div> 
      )
     }
    render(){
    return (
            <div className = "topicDialog" id="topicMenu"> 
            {this.renderTopicDialog()}
            </div> 
    )}
}
export default withRouter(Post); 