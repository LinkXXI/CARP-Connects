Template.login.events({
    "submit #login": function (e, template) {
        e.preventDefault();
        var email = $(e.target).find('#email').val();
        var password = $(e.target).find('#password').val();

        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                console.log(err);
                sAlert.error(LOGIN_ERROR);
            } else {
                //Router.go('/'); // don't need, by default goes to index
            }
        })
    },
    "submit #signup-form": function (e, template) {
        e.preventDefault();
        var first = $(e.target).find('#signup-first-name').val();
        var last = $(e.target).find('#signup-last-name').val();
        var email = $(e.target).find('#signup-email').val();
        var password = $(e.target).find('#signup-password').val();
        var confirmPassword = $(e.target).find("#signup-confirm-password").val();
        var inviteCode = $(e.target).find('#signup-invite-code').val();

        Meteor.call('setUpAccount', first, last, email, password, confirmPassword, function (err, data) {
            if (err) {
                console.log(err);
                sAlert.error(SIGNUP_ERROR);
            } else {
                if (data) {

                } else {
                    $('#signup-modal').closeModal();
                    Meteor.loginWithPassword(email, password, function () {
                        Meteor.call("validateInvitation", inviteCode, null); // moved call here to work when user logged in
                        Router.go('/');
                        sAlert.success(SIGNUP_SUCCESS);
                    });
                }
            }
        });
    },
    "click #signup": function () {
        $('#signup-modal').openModal();
    },
    "click #passreset": function (e) {
        e.preventDefault();
        $('#passreset-modal').openModal();
    },
    "submit #forgotpasswordnew-form": function (e) {
        e.preventDefault();
        var $forgotpasswordModal = $('#forgotpasswordnew-modal');
        var token = this.token;
        var newPassword = $(e.target).find('#forgotpasswordnew').val();
        //TODO: meteor add audit-argument-checks
        /*
         check(emailConfirm, {
         address: String
         });
         */

        if (token && newPassword) {
            Accounts.resetPassword(token, newPassword, function (err) {
                if (err) {
                    sAlert.error(GENERIC_UNEXPECTED_ERROR);
                } else {
                    sAlert.success(ACCOUNT_CHANGE_PASSWORD_SUCCESS);
                    Router.go('/'); // will login automatically
                }
            });
        } else {
            sAlert.error(GENERIC_UNEXPECTED_ERROR);
        }
        $forgotpasswordModal.find('form')[0].reset();
        $forgotpasswordModal.closeModal();
    }
});

Template.login.created = function () {
    verifyEmail();
};

Template.login.onRendered(function () {
    switch (Router.current().route.getName()) {
        case "ForgotPassword":
            $('#forgotpasswordnew-modal').openModal();
            break;
        case "Signup":
                this.find('#signup-invite-code').defaultValue = this.data.inviteId;
                var label = this.find('#signup-invite-code-label');
                label.className = label.className + " active";
                $('#signup-modal').openModal();
            break;
        default:
            break;
    }
});