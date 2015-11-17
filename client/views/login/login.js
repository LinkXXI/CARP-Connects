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
                Router.go('/');
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

        Meteor.call('setUpAccount', first, last, email, password, confirmPassword, inviteCode, function (err, data) {
            if (err) {
                console.log(err);
                sAlert.error(SIGNUP_ERROR);
            } else {
                if (data) {

                } else {
                    $('#signup-modal').closeModal();
                    Meteor.loginWithPassword(email, password, function () {
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
    "click #passreset": function(e) {
        e.preventDefault();
        $('#passreset-modal').openModal();
    },
    "submit #forgotpassword-form": function (e) {
        e.preventDefault();
        var $forgotpasswordModal = $('#forgotpassword-modal');
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

Template.login.onRendered(function() {
    if (Router.current().route.getName() === "ForgotPassword") {
        $('#forgotpasswordnew-modal').openModal();
    }
});