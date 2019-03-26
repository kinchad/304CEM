function regValidation(){
    var name = document.forms['regForm']['name'].value
    var login = document.forms['regForm']['login'].value
    var password = document.forms['regForm']['password'].value
    var confirmPwd = document.forms['regForm']['confirmPwd'].value
    var letterNumber = /^[0-9a-zA-Z]+$/
    
    if(!login.match(letterNumber)){
        alert('Login ID only accept letters and numbers.')
        return false
    }else if(!password.match(letterNumber)){
        alert('Password only accept letters and  number.')
        return false
    }else if(password.localeCompare(confirmPwd)!=0){
        alert('Confirm password does not match.')
        return false
    }
}