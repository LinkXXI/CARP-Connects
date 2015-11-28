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
        //TODO: CHECK IF GOOGLE ID IS USED ALREADY, WILL BREAK IF GOOGLE ID USED TWICE
        Meteor.signInWithGoogle({
            requestPermissions: ['email', 'https://www.googleapis.com/auth/drive.file'],
            requestOfflineToken: true
        },
            function (err, mergedUserId) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log("User " + mergedUserId + " has been merged");

            }
        )
    },
    'submit #invite-form': function(e, template){
        e.preventDefault();
        var inviteCode = $(e.target).find("#invite-code").val();
        Meteor.call("validateInvitation", inviteCode, function(err, data){
            if(err || !data){
                if(!data){
                    $(e.target).find("#invite-code-error").html("Invalid invitation code!");
                }else if (err){
                    console.log(err);
                    $(e.target).find("#invite-code-error").html("An error has occurred!");
                }
            }else{

            }
        })
    },
    'click #a-resend-verification': function(e, template){
        Meteor.call('resendVerificationEmail', function(err, data){
            if(err || !data){

            }else{

            }
        });
    }
});

Template.incomplete.helpers({
    completed: function () {
        if (Meteor.user()) {
            if ((Meteor.user().emails[0].verified && Meteor.user().profile.inviteCode && Meteor.user().profile.googleLinked)) {
                Meteor.call('updatePermissions', null, {
                    role:"user"
                });
                Router.go('/');
            }
        }
    },
    emailValidated: function () {
        if (Meteor.user()) {
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

Template.incomplete.created = function(){
  verifyEmail();
};