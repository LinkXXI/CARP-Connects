Meteor.methods({
    "validateInvitation": function (inviteCode) {
        var count = invitations.find({
            _id: inviteCode,
            //TODO: Add usergroup/permission level to invitation search
            validFor: { $in: [Meteor.user().emails[0].address, Meteor.userId(), "Any"]}
        }).count();
        if (count > 0) {
            invitations.update({_id: inviteCode}, {
                $set: {
                    used:true,
                    appliedTo: Meteor.userId()
                }
            });
            Meteor.users.update({_id: Meteor.userId()}, {
                $set: {
                    "profile.inviteCode": inviteCode
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
                inviteCode: undefined,
                googleLinked: true
            }
        });

        //NOTE: New user is now logged in.
        if (inviteCode) {
            var result = Meteor.call("validateInvitation", inviteCode);
            if(!result){
                //TODO: Handle Error
            }
        }
    },
    "resendVerificationEmail": function(){
        if(Meteor.user()) {
            Accounts.sendVerificationEmail(Meteor.userId(), Meteor.user().emails[0].address);
            return true;
        }else{
            return false;
        }
    },
    "updateAccount": function(userAttributes) {
        if(this.user()) {
            check(userAttributes, {
                first: String,
                last: String,
                bio: String,
                skills: String
            });
            Accounts.update(this.userId(), {$set: userAttributes}, function(error) {
                if (error) {
                    return error;
                }
            });
            return true;
        }else{
            return false;
        }
    }
});
