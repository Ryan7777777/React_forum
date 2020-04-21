import $ from 'jquery';
import defaultUserImage from '../../src/Image/logo/default-user-image.png';

const getUserImage = (userId) =>{
    $.ajax({
        url:"http://127.0.0.1:4255/api/v1/users/"+userId+"/photo",
        cache:false,
        xhr:function(){// Seems like the only way to get access to the xhr object
            var xhr = new XMLHttpRequest();
            xhr.responseType= 'blob'
            return xhr;
        },
        success: function(data){
            var logo = document.getElementById('imgLogo');
            var url = window.URL || window.webkitURL;
            logo.src = url.createObjectURL(data);
        },
        error:function(){    
            var logo = document.getElementById("imgLogo")
            logo.src = (defaultUserImage);
        }
    });
}
const getUserPhoto = (userId) =>{
    $.ajax({
        url:"http://127.0.0.1:4255/api/v1/users/"+userId+"/photo",
        cache:false,
        xhr:function(){// Seems like the only way to get access to the xhr object
            var xhr = new XMLHttpRequest();
            xhr.responseType= 'blob'
            return xhr;
        },
        success: function(data){
            var userPhoto = document.getElementById('imgImage');
            var url = window.URL || window.webkitURL;
            userPhoto.src = url.createObjectURL(data);
        },
        error:function(){    
            var userPhoto = document.getElementById("imgImage")
            userPhoto.src = (defaultUserImage);
        }
    });
}
const uploadFile = (file) =>{
    return $.ajax({
        url:"http://127.0.0.1:4255/api/v1/users/"+localStorage.userId+"/photo",
        data: file,
        type:'POST',
        async: false,
        processData: false,
        contentType: file.type,
        headers:{
            'X-Authorization': localStorage.auth
        },
    })
}
export const userPhotoService = {
    getUserImage,
    getUserPhoto,
    uploadFile

};