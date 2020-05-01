import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import lastUpdateCalaulater  from "../tools/lastupdateCalculater"
import {userService} from "./user.service"
import Error404Page from '../App/404Error/404Error';
import Error500Page from '../App/500Error/500Error';
const postOpen = false;

const loadAllComment = (postId) =>{
    return new Promise((reslove, reject)=>{
        $.ajax({
            url:'http://127.0.0.1:4255/api/v1/comment/' +postId,
            type: 'GET',
            async: true,
            success: function(data){
                reslove(data)
            }, error: function(qxhr){
                if(qxhr.status === 404){
                    ReactDOM.render(<Error404Page/>,document.getElementById('page'));
                } else {
                    ReactDOM.render(<Error500Page/>,document.getElementById('page'));
                }
            }
        })
    })
}
const loadCommentPhotosName = (commentId,com) => {
    let allPhoto = []
    $.ajax({
        url:'http://127.0.0.1:4255/api/v1/comment/' + commentId +'/photo',
        type:'GET',
        async: false,
        success: function(data){
            console.log(data)
            allPhoto = data
        },
        error: function(qxhr){
            console.log(qxhr )
        }
    })
    var commentMenu = document.getElementById('com'+com);
    for (var i=0 ; i < allPhoto.length ; i++){
        getCommentPhoto(commentId,allPhoto[i].fileName,com)
    }
    
}
const getCommentPhoto = (commentId,fileName,com) =>{
    $.ajax({
        url:'http://127.0.0.1:4255/api/v1/comment/' + commentId + '/photo/' + fileName,
        cache: false,
        xhr:function(){
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob'
            return xhr
        },
        success: function(data){
            var ul = document.getElementById('ul'+com);
            var li = document.createElement('li')
            var image = document.createElement('img');
            var url = window.URL || window.webkitURL;
            image.src = url.createObjectURL(data)
            li.appendChild(image)
            console.log(ul)
            ul.appendChild(li)
        }, error: function(qxhr){
            console.log(qxhr)
        }
    });
}
export const commentServie = {
    loadAllComment
}