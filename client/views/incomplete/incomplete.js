Template.incomplete.events({
    'click #google-button': function (e, template) {
        /*Meteor.loginWithGoogle({
         requestPermissions: [""],
         requestOfflineToken: true,
         userEmail: Meteor.user().emails[0].address,
         loginStyle: "popup"
         }, function (error) {
         if (error) {
         console.log(error);
         }
         })*/
        Meteor.signInWithGoogle({
                requestPermissions: ['email', 'https://www.googleapis.com/auth/drive.file'],
                requestOfflineToken: true
            },
            function (err, mergedUserId) {
                if (err) {
                    console.log(err);
                    return;
                }
                //console.log("User " + mergedUserId + " has been merged");
            }
        )
    },
    'submit #invite-form': function (e, template) {
        e.preventDefault();
        var inviteCode = $(e.target).find("#invite-code").val();
        Meteor.call("validateInvitation", inviteCode, function (err, data) {
            if (err || !data) {
                if (!data) {
                    $(e.target).find("#invite-code-error").html("Invalid invitation code!");
                } else if (err) {
                    console.log(err);
                    $(e.target).find("#invite-code-error").html("An error has occurred!");
                }
            } else {

            }
        })
    },
    'click #a-resend-verification': function (e, template) {
        Meteor.call('resendVerificationEmail', function (err, data) {
            if (err || !data) {

            } else {

            }
        });
    }
});

Template.incomplete.helpers({
    completed: function () {
        if (Meteor.user() && Meteor.user().emails) { // add emails check to fix error: Exception in template helper: TypeError: Cannot read property '0' of undefined
            var role = Meteor.user().profile.permissions.role;
            var permissions = Meteor.user().profile.permissions;

            if (Meteor.user().emails[0].verified &&
                Meteor.user().profile.inviteCode &&
                Meteor.user().profile.googleLinked &&
                Meteor.user().services &&
                Meteor.user().services.google) { // do a sanity check for services.google as well, required to check if google is truly linked on the account
                if (role != "Admin" && role == "incomplete") { // avoid modifying Admin users, and only modify users who have an incomplete profile
                    _.extend(permissions, {
                        role: "user" // default all users with incomplete role to the user role
                    });
                    Meteor.call('updatePermissions', Meteor.userId(), permissions);
                }
                Router.go('/');
            } else { // make sure no role is given (this handles scenarios where googleLinked was changed to false for example)
                if (role != "Admin") { // avoid modifying Admin users
                    _.extend(permissions, {
                        role: "incomplete"
                    });
                    Meteor.call('updatePermissions', Meteor.userId(), permissions);
                }
            }
        }
    },
    emailValidated: function () {
        if (Meteor.user() && Meteor.user().emails) { // add emails check to fix error: Exception in template helper: TypeError: Cannot read property '0' of undefined
            return !!Meteor.user().emails[0].verified
        }
    },
    isInviteCompleted: function () {
        if (Meteor.user()) {
            return !!Meteor.user().profile.inviteCode;
        }
    },
    isGoogleSetup: function () {
        if (Meteor.user()) {
            return !!Meteor.user().profile.googleLinked;
        }
    }

});

Template.incomplete.created = function () {
    verifyEmail();
};