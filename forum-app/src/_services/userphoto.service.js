import $ from 'jquery';
import defaultUserImage from '../../src/Image/logo/default-user-image.png';
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
            var img = document.getElementById('img');
            var url = window.URL || window.webkitURL;
            img.src = url.createObjectURL(data);
        },
        error:function(){    
            var img = document.getElementById("img")
            img.src = (defaultUserImage);
        }
    });
}
export const userPhotoService = {
    getUserPhoto
};