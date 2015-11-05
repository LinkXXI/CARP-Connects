Meteor.methods({
    "validateInvitation": function (inviteCode, applyToId) {
        var count = invitations.find({
            _id: inviteCode,
            //TODO: Add usergroup/permission level to invitation search
            validFor: { $in: [Meteor.user().emails[0].address, Meteor.userId(), "Any"]},
            used: false
        }).count();
        if (count > 0 || applyToId){//(applyToId && Meteor.user().profile.role == "Administrator")) { //TODO: Also check if user is admin before continuing
            invitations.update({_id: inviteCode}, {
                $set: {
                    used:true,
                    appliedTo: applyToId || Meteor.userId()
                }
            });
            Meteor.users.update({_id: applyToId || Meteor.userId()}, {
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
    "resendVerificationEmail": function(index){
        if(Meteor.user()) {
            index = parseInt(index) || 0;
            Accounts.sendVerificationEmail(Meteor.userId(), Meteor.user().emails[index].address);
            return true;
        }else{
            return false;
        }
    },
    "updateAccount": function(userAttributes) {
        if(Meteor.user()) {
            //TODO: meteor add audit-argument-checks
            /*
             check(userAttributes, {
             "profile.firstName": String,
             "profile.lastName": String,
             "profile.biography": String,
             "profile.skills": String
             });
             */
            Meteor.users.update(Meteor.userId(), {$set: userAttributes}, function(error) {
                if (error) {
                    return error;
                }
            });
            return true;
        } else {
            return false;
        }
    },
    "updateEmails": function(email) {
        if(Meteor.user()) {
            //TODO: meteor add audit-argument-checks
            /*
             check(email, {
                 "emails.address": String,
                 "emails.verified": Boolean
             });
             */
            if (email) {
                Accounts.addEmail(Meteor.userId(), email);
            }
            return true;
        } else {
            return false;
        }
    },
    "removeEmails": function(email) {
        if(Meteor.user()) {
            //TODO: meteor add audit-argument-checks
            /*
             check(email, {
             "emails.address": String,
             "emails.verified": Boolean
             });
             */
            if (email) {
                Accounts.removeEmail(Meteor.userId(), email);
            }
            return true;
        } else {
            return false;
        }
    },
    updatePhones: function(phone) {
        if(Meteor.user()) {
            // editable for current user only, meteor.user will suffice, make sure current phone added is only primary number
            if (phone.primary) {
                Meteor.users.update({_id:Meteor.userId(), "profile.phones.primary" : true}, {$set: {"profile.phones.$.primary" : false}}, function(error) {
                    if (error) {
                        return error;
                    }
                });
            }
            Meteor.users.update(Meteor.userId(), {$push: {"profile.phones":phone}}, function(error) {
                if (error) {
                    return error;
                }
            });
            return true;
        } else {
            return false;
        }
    },
    disableAccount: function (accountId) {
        Meteor.users.update({_id:accountId}, {$set:{'profile.accountLocked':true}});
    },
    enableAccount: function(accountId){
        Meteor.users.update({_id:accountId},{$set:{'profile.accountLocked':false}});
    }
});
