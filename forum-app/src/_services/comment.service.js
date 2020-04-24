import $ from 'jquery';
import lastUpdateCalaulater  from "../tools/lastupdateCalculater"
const postOpen = false;

const loadAllComment = (postId) =>{
    $.ajax({
        url:'http://127.0.0.1:4255/api/v1/comment/' +postId,
        type: 'GET',
        async: false ,
        success: function(data){
            var commentMenu = document.getElementById('contentMenu');
            commentMenu.innerHTML = ""
            for(var i = 0;  i< data.length ; i++){
            var commentContainer = document.createElement('div')
            commentContainer.id = "com" + i
            commentContainer.className = "commentComtainer"
            var content = document.createElement('p')
            content.innerHTML = data[i].content
            commentContainer.appendChild(content)
            var date = document.createElement('p')
            date.innerHTML =  lastUpdateCalaulater(data[i].date)
            commentContainer.appendChild(date)
            var ul = document.createElement('ul')
            ul.id = 'ul' + i
            commentContainer.appendChild(ul)
            loadCommentPhotosName(data[i].id,i)
            commentMenu.appendChild(commentContainer)
        }
    }
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
    console.log(fileName)
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