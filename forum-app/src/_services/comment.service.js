import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
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

export const commentServie = {
    loadAllComment,
}