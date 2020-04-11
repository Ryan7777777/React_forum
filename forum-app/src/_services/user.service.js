import $ from 'jquery';
const login = (email,password) => {
        return $.ajax({
        url:'http://127.0.0.1:4255/api/v1/users/login',
        type:'POST',
        data:JSON.stringify({email:email,password:password}),
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function(data,status,xhr){      
            localStorage.setItem('login', true, { path: '/' });
            localStorage.setItem('auth', data.token, { path: '/' });
        }
    })
}
const logout = () => {
    return $.ajax({
        url:'http://127.0.0.1:4255/api/v1/users/logout',
        type:'POST',
        headers:{
            'X-Authorization': localStorage.auth
        },
        async: false,
        success: function(data,status,xhr){ 
            console.log(99) 
            localStorage.setItem('login', false, { path: '/' });
            localStorage.setItem('auth', '', { path: '/' });
        }
    })
}
const createuser = (username,email,given_name,family_name,password) =>{
    return $.ajax({
        url:'http://127.0.0.1:4255/api/v1/users',
        type:'POST',
        data:JSON.stringify({username:username,email:email,given_name:given_name,family_name:family_name,password:password}),
        contentType: "application/json",
        dataType: 'json',
        async: false,
    })
}
export const userService = {
    login,
    logout,
    createuser
};