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
export const postService = {
    loadallpost
}