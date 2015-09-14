singupUser = function(firstName, lastName, email, password, confirmPass, inviteCode){
    /*
     This regex can be used to restrict passwords to a length of 8 to 20 aplhanumeric characters and select special characters. The password also can not start with a digit, underscore or special character and must contain at least one digit.
     ^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}
     */

    if(password !== confirmPass){
        return false;
    }

    var regex = new RegExp("^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}")
    if(!regex.text(password)){
        return false;
    }

    if(!firstName || !lastName){
        return false;
    }

    if(inviteCode){

    }else{

    }
};