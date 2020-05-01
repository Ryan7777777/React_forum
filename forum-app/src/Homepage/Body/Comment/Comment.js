import React from 'react';
import "./Comment.css";
import { commentServie } from '../../../_services/comment.service';
import { userService } from '../../../_services/user.service';
import lastUpdateCalaulater  from "../../../tools/lastupdateCalculater";
class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state={postId:null,comments:[],commentsId:null,error:null,reload:null}
    }
    static getDerivedStateFromProps(props,states){
        var pathName = window.location.pathname.split('/')
        return{postId:pathName[2]}
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
    render(){
        return (
             <div className = "contentDialog" id='contentDialog'>
                <div className = 'content' id='content'>   
                <div className = 'topic'></div>
                <div>{this.state.comments.map((comment,i)=>(
                    <div>
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
                    </div>
                    <div className='gap'>gfdgadgfa</div>
                     </div>
                    ))}
                </div>
                </div>
            </div>
           
    )}
}
export default Comment; 