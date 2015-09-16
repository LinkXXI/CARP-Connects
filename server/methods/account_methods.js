Meteor.methods({
    "validateInvitation": function (inviteCode) {
        if (invitations.find({_id: inviteCode}).count > 0) {
            invitations.update({_id: inviteCode}, {
                $set: {
                    used:true
                }
            });
            return true;
        }else{
            return false;
        }
    },
    setUpAccount: function (firstName, lastName, email, password, confirmPass, inviteCode) {
        /*
         This regex can be used to restrict passwords to a length of 8 to 20 aplhanumeric characters and select special characters. The password also can not start with a digit, underscore or special character and must contain at least one digit.
         ^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}
         */

        if (password !== confirmPass) {
            return {result:false,element:"password"};
        }

        //TODO: Debug/find functioning REGEX
        //var regex = new RegExp("^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}")
        //if (!regex.test(password)) {
        //    return {result:false,element:"password"};
        //}

        if (!firstName || !lastName) {
            return {result:false,element: (!firstName) ? "fistName":"lastName"};
        }

        Accounts.createUser({
            email: email,
            password: password,
            profile:{
                permissions:{
                    role:'incomplete'
                },
                firstName: firstName,
                lastName: lastName,
                inviteCode: inviteCode,
                googleLinked: false
            }
        });

        //NOTE: New user is now logged in.
        if (inviteCode) {
            var result = Meteor.call("validateInvitation", inviteCode)
            if(!result){
                //TODO: Handle Error
            }
        }
    }
});
