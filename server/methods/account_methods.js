Meteor.methods({
    "validateInvitation": function (inviteCode, applyToId) { // applyToId = generating invite scenario
        if (Meteor.user()) { // make sure user is logged in, either admin generating an invite or user using an invite
            var count = invitations.find({
                _id: inviteCode,
                //TODO: Add usergroup/permission level to invitation search
                validFor: {$in: [Meteor.user().emails[0].address, Meteor.userId(), "Any"]},
                used: false
            }).count();
            if (count > 0 || applyToId) {//(applyToId && Meteor.user().profile.role == "Administrator")) { //TODO: Also check if user is admin before continuing
                invitations.update({_id: inviteCode}, {
                    $set: {
                        used: true,
                        appliedTo: applyToId || Meteor.userId()
                    }
                });
                Meteor.users.update({_id: applyToId || Meteor.userId()}, {
                    $set: {
                        "profile.inviteCode": inviteCode
                    }
                });
                return true;
                /* removed block, a user will always be logged in when validating an invitation, either an admin during generate and apply or the user themselves
                 else {
                 Meteor.users.update({'emails.address': searchMail}, {
                 $set: {
                 "profile.inviteCode": inviteCode
                 }
                 });
                 }*/
            } else {
                return false;
            }
        }
    },
    setUpAccount: function (firstName, lastName, email, password, confirmPass) {
        /*
         This regex can be used to restrict passwords to a length of 8 to 20 aplhanumeric characters and select special characters. The password also can not start with a digit, underscore or special character and must contain at least one digit.
         ^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}
         */

        if (password !== confirmPass) {
            return {result: false, element: "password"};
        }

        //TODO: Debug/find functioning REGEX
        //var regex = new RegExp("^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}")
        //if (!regex.test(password)) {
        //    return {result:false,element:"password"};
        //}

        if (!firstName || !lastName) {
            return {result: false, element: (!firstName) ? "firstName" : "lastName"};
        }

        var userId = Accounts.createUser({
            email: email,
            password: password,
            profile: {
                permissions: {
                    role: 'incomplete'
                },
                firstName: firstName,
                lastName: lastName,
                inviteCode: undefined,
                googleLinked: false
            }
        });

        if (userId) {
            Accounts.sendVerificationEmail(userId); // added because Accounts.config did not work

            //if (inviteCode) { removed block after implementing login fix, above logic works for logged in users now, invitation is validated after login on client side
            //return inviteCode;
            //var result = Meteor.call("validateInvitation", inviteCode, null, email);
            //if (!result) {
            //TODO: Handle Error
            //}
            //}
        }
    },
    "resendVerificationEmail": function (user, index) {
        if (Meteor.user()) {
            if (user && index) {
                Accounts.sendVerificationEmail(user._id, user.emails[parseInt(index)].address);
            } else {
                Accounts.sendVerificationEmail(Meteor.userId());
            }
        } else {
            return false;
        }
    },
    "updateAccount": function (userId, userAttributes) {
        if (Meteor.user() && userId) {
            //TODO: meteor add audit-argument-checks
            /*
             check(userAttributes, {
             "profile.firstName": String,
             "profile.lastName": String,
             "profile.biography": String,
             "profile.skills": String
             });
             */
            Meteor.users.update(userId, {$set: userAttributes}, function (error) {
                if (error) {
                    return error;
                }
            });
            return true;
        } else {
            return false;
        }
    },
    updatePermissions: function (userId, permissions) {
        Meteor.users.update(userId || Meteor.userId(), {
            $set: {
                'profile.permissions': permissions
            }
        });
    },
    "updateEmails": function (userId, email) {
        if (Meteor.user() && userId) {
            //TODO: meteor add audit-argument-checks
            /*
             check(email, {
             "emails.address": String,
             "emails.verified": Boolean
             });
             */
            if (email) {
                Accounts.addEmail(userId, email);
            }
            return true;
        } else {
            return false;
        }
    },
    "removeEmails": function (userId, email) {
        if (Meteor.user() && userId) {
            //TODO: meteor add audit-argument-checks
            /*
             check(email, {
             "emails.address": String,
             "emails.verified": Boolean
             });
             */
            if (email) {
                Accounts.removeEmail(userId, email);
            }
            return true;
        } else {
            return false;
        }
    },
    updatePhones: function (userId, phone) {
        if (Meteor.user() && userId) {
            // editable for current user and Administrator, make sure current phone added is only primary number
            if (phone.primary) {
                Meteor.users.update({
                    _id: userId,
                    "profile.phones.primary": true
                }, {$set: {"profile.phones.$.primary": false}}, function (error) {
                    if (error) {
                        return error;
                    }
                });
            }
            Meteor.users.update(userId, {$push: {"profile.phones": phone}}, function (error) {
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
        Meteor.users.update({_id: accountId}, {$set: {'profile.accountLocked': true}});
    },
    enableAccount: function (accountId) {
        Meteor.users.update({_id: accountId}, {$set: {'profile.accountLocked': false}});
    },
    phonetypeInsert: function (phonetype) {
        //TODO: check permission using same logic as security.js
        var newId = phonetypes.insert(phonetype);
        if (newId) {
            return true;
        } else {
            return false;
        }
    },
    phonetypeDelete: function (phoneTypeId) {
        var count = Meteor.users.find({
            "profile.phones.type": phoneTypeId
        }).count();
        if (count === 0) {
            phonetypes.remove(
                {_id: phoneTypeId}
            );
            return true;
        }
        else {
            return false;
        }
    }
});
