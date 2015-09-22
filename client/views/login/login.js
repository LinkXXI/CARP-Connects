Template.login.events({
    "submit #login": function (e, template) {
        e.preventDefault();
        var email = $(e.target).find('#email').val();
        var password = $(e.target).find('#password').val();

        Meteor.loginWithPassword(email, password, function (err) {
            if(err){
                console.log(err)
            }else{
                Router.go('/');
            }
        })
    },
    "submit #signup-form": function (e, template) {
        e.preventDefault();
        var first = $(e.target).find('#signup-first-name').val();
        var last = $(e.target).find('#signup-last-name').val();
        var email = $(e.target).find('#signup-email').val();
        var password= $(e.target).find('#signup-password').val();
        var confirmPassword= $(e.target).find("#signup-confirm-password").val();
        var inviteCode = $(e.target).find('#signup-invite-code').val();

       Meteor.call('setUpAccount', first, last, email, password, confirmPassword, inviteCode, function (err, data) {
            if(err){
                console.log(err);
            }else{
                if(data){

                }else{
                    $('#signup-modal').closeModal();
                    Router.go('/');
                }
            }
        });
    },
    "click #signup": function(){
        $('#signup-modal').openModal();
    }
});

Template.login.created = function(){
    verifyEmail();
};