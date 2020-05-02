import React from 'react';
import "./Comment.css";
import { commentServie } from '../../../_services/comment.service';
import { userService } from '../../../_services/user.service';
import lastUpdateCalaulater  from "../../../tools/lastupdateCalculater";
import { commentPhotoServie } from '../../../_services/commentPhoto.service';
class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state={postId:null,comments:[],commentsId:null,error:null}
    }
    static getDerivedStateFromProps(props,states){
        if(props.postId !== states.postId){
            return{postId:props.postId,load:false}
        } 
    }
    componentDidMount(){
          this.getComments(this.postId)
    }
    getComments = () =>{
        commentServie.loadAllComment(this.state.postId)
        .then(data=>{
            for(var i= 0 ; i < data.length ; i++){
                var username =  this.getAuthor(data[i].user)
                data[i]["author"] = username
            }
            this.setState({comments:data})
        }) 
    }
    getAuthor = (userId) =>{
        return userService.getUserName(userId).responseJSON.username
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.postId !== nextProps.postId){// new postId assign 
            return true
        }else if(this.state.comments.length !== nextState.comments.length){ //second round update comments
            return true
        }else{
            return false
            }
    }
    componentDidUpdate(){
        this.getComments(this.props.postId)
    }
    addPhotoId(i){
       
       this.loadPhoto(i)
    }
    loadPhoto(i){
        commentPhotoServie.loadCommentPhotosName(this.state.postId,i)
    }
    render(){
        return (
             <div className = "contentDialog" id='contentDialog'>
                <div className = 'content' id='content'>   
                <div className = 'topic'>{this.props.postTitle}</div>
                <div>{this.state.comments.map((comment,i)=>(
                    <div key={i}>
                    <div className="commmentBox">
                        <div className="commentAuthor">
                            {this.getAuthor(comment.user)}
                        </div>
                        <div className='commentDate'>
                            {lastUpdateCalaulater(comment.date)}
                        </div>
                        <div className='commentContent'>
                             {comment.content}
                        </div>
                        <div className='commentImage'>
                            <ul id={"pho"+i}></ul> 
                        </div>
                        {this.addPhotoId(i)}
                    </div>
                    <div className='gap'></div>
                     </div>
                    ))}
                </div>
                </div>
            </div>
           
    )}
}
export default Comment; 