import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Error500Page from '../App/500Error/500Error';
import Error404Page from '../App/404Error/404Error';
const loadallpost = () =>{
    return new Promise((reslove,reject)=>{
        $.ajax({
            url:'http://127.0.0.1:4255/api/v1/allpost/',
            type:'GET',
            async: false ,
            success: function(data){   
                reslove(data)
            }, error: function(qxhr){
                if(qxhr.status === 404){
                    ReactDOM.render(<Error404Page/>,document.getElementById('page'));
                } else{
                    ReactDOM.render(<Error500Page/>,document.getElementById('page'));
                }
            }
            })  
    })
}
const uploadNewPost = (topic,text,images) =>{
    return new Promise((reslove,reject)=>{
        $.ajax ({
        url:'http://127.0.0.1:4255/api/v1/newpost',
        type:'POST',
        async:false,
        headers:{
            'X-Authorization': localStorage.auth
        },
        data:JSON.stringify({title:topic,content:text}),
        contentType:'application/json',
        success:function(data){
            if(images.length<=0){
                reslove(data)
            }else{
                uploadNewPostPhoto(data.commentId,images)
                .then(res=>{
                    reslove(res)
                })
                .catch(error=>{
                    reject(error)
                })
            }
        }, error: function(error){
            reject(error)
        }
    })
})
}
const uploadNewPostPhoto = (commentId,images) => {
    for (var i=0; i< images.length; i++){
        var data = new FormData();
        data.append('image',images[i])
    }
    return new Promise((reslove,reject)=>{ $.ajax({
        url:'http://127.0.0.1:4255/api/v1/post/'+commentId+'/photo',
        type:"POST",
        headers:{
            'X-Authorization': localStorage.auth
        },
        enctype: 'multipart/form-data',
        data:data,
        async: false,
        processData: false,
        contentType:false,
        success:function(res){
            reslove(res)
        },error:function(error){
            reject(error)
        }
    })
})  
}
export const postService = {
    loadallpost,
    uploadNewPost
}