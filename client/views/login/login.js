Template.login.events({
    "submit #login": function (e, template) {
        e.preventDefault();
    },
    "submit #signup-form": function (e, template) {
        e.preventDefault();
        console.log(e.target);
        first = $(e.target).find('#signup-first-name').val();
        last = $(e.target).find('#signup-last-name').val();
        email = $(e.target).find('#signup-email').val();
        password= $(e.target).find('#signup-password').val();
        confirmPassword= $(e.target).find("#signup-confirm-password").val();
        inviteCode = $(e.target).find('#signup-invite-code').val();

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
        })

    },
    "click #signup": function(){
        $('#signup-modal').openModal();
    }
});