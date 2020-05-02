import $ from 'jquery';
const loadCommentPhotosName = (commentId,com) => {
    let allPhoto = []
    $.ajax({
        url:'http://127.0.0.1:4255/api/v1/comment/' + commentId +'/photo',
        type:'GET',
        async: false,
        success: function(data){
            allPhoto = data
        },
        error: function(qxhr){
            console.log(qxhr )
        }
    })
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
            var ul = document.getElementById('pho'+com);
            var li = document.createElement('li')
            var image = document.createElement('img');
            var url = window.URL || window.webkitURL;
            image.src = url.createObjectURL(data)
            li.appendChild(image)
            ul.appendChild(li)
        }, error: function(qxhr){
        }
    });
}
export const commentPhotoServie = {
    loadCommentPhotosName
}