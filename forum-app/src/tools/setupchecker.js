import $ from 'jquery';

const passwordchecker = (password,confrimpassword) =>{
    if(password === confrimpassword){
        return true;
    } else{
        return false;
    }
}
const usernamechecker = (u) => {
    const result = $.post({
        url:'http://127.0.0.1:4255/api/v1/users/usernamechecker',
        data:JSON.stringify({username:u}),
        contentType: "application/json",
        async: false,
    })
    if(result.status === 200){
        return true
    } else{
        return false
    }
}
const validateemail = (e) =>{
    if(e.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        return true
    } else{
        return false
    }
}
const emailchecker = (e) =>{
    const result = $.ajax({
            url:'http://127.0.0.1:4255/api/v1/users/checkemail',
            type:'POST',
            data:JSON.stringify({email:e}),
            contentType: "application/json",
            dataType: 'json',
            async: false,
        })
    if(result.status === 200){
        return true
    } else{
        return false
    }
}
const seven_digit_length_checker = (p) =>{
    if(p.length >=7){
        return true
    } else{
        return false
    }
}
export const setUpChecker = {
    passwordchecker,
    usernamechecker,
    emailchecker,
    validateemail,
    seven_digit_length_checker
};
