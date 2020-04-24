import $ from 'jquery';
import lastUpdateCalaulater  from "../tools/lastupdateCalculater"
import { commentServie } from "../_services/comment.service"
const loadallpost = () =>{
    $.ajax({
        url:'http://127.0.0.1:4255/api/v1/allpost',
        type:'GET',
        async: true ,
        success: function(data){  
           for (var i=0 ; i < data.length ; i++){
               var postContainer = document.createElement('div')
               postContainer.addEventListener('click',function(index){ return function(){commentServie.loadAllComment(data[index].id)}}(i))
               postContainer.className = "postBox"
               var author =  document.createElement('p')
               author.className ="author"
               author.innerHTML = data[i].author
               postContainer.appendChild(author)
               var date = document.createElement('p')
               date.className = "date"
               date.innerHTML = lastUpdateCalaulater(data[i].date)
               postContainer.appendChild(date)
               var topic = document.createElement('p')
               topic.innerHTML = data[i].title
               topic.className = 'title'
               postContainer.appendChild(topic)
               var postMenu = document.getElementById('topicMenu');  
               postMenu.appendChild(postContainer)
           }
        }
    })
}
export const postService = {
    loadallpost
}