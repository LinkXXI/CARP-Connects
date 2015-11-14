Template.accountView.helpers({
    "editAllowed": function() {
        var role = Meteor.user().profile.permissions.role;
        return Meteor.userId() === this._id || role === "Administrator";
    },
    "changePassword": function() {
        return Meteor.userId() === this._id; //allow password change since user profile is for current user
    }
});

Template.accountView.events({
    "click #passchange": function(e) {
        e.preventDefault();
        $('#passchange-modal').openModal();
    },
    "submit #passchange-form": function (e) {
        e.preventDefault();
        var $passchangeModal = $('#passchange-modal');
        var password = {
            current: $(e.target).find('#curpassword').val(),
            new: $(e.target).find('#newpassword').val(),
            confirmNew: $(e.target).find('#new2password').val()
        };
        //TODO: meteor add audit-argument-checks
        /*
         check(password, {
         current: String,
         new: String,
         confirmNew: String
         });
         */
        if (password.new === password.confirmNew) {
            Accounts.changePassword(password.current, password.new, function (err) {
                if (err) {
                    sAlert.error(ACCOUNT_CHANGE_PASSWORD_ERROR);
                } else {
                    sAlert.success(ACCOUNT_CHANGE_PASSWORD_SUCCESS);
                }
            });
        } else {
            sAlert.error(ACCOUNT_CHANGE_PASSWORD_NO_MATCH);
        }
        $passchangeModal.find('form')[0].reset();
        $passchangeModal.closeModal();
    },
    "click #passreset": function(e) {
        e.preventDefault();
        $('#passreset-modal').openModal();
    },
    "submit #passreset-form": function (e) {
        e.preventDefault();
        var $passresetModal = $('#passreset-modal');
        var emailConfirm = {
            address: $(e.target).find('#email').val(),
            valid: false
        };
        var emails = this.emails;
        for (var i=0; i<emails.length;i++) {
            if (emailConfirm.address === emails[i].address) {
                emailConfirm.valid = true;
                break;
            }
        }
        //TODO: meteor add audit-argument-checks
        /*
         check(emailConfirm, {
         address: String
         });
         */

        if (emailConfirm.valid) {
            Accounts.forgotPassword({email: emailConfirm.address}, function (err) {
                if (err) {
                    sAlert.error(ACCOUNT_FORGOT_PASSWORD_ERROR);
                } else {
                    sAlert.success(ACCOUNT_FORGOT_PASSWORD_SUCCESS);
                }
            });
        } else {
            sAlert.error(ACCOUNT_FORGOT_PASSWORD_EMAIL_NO_MATCH);
        }
        $passresetModal.find('form')[0].reset();
        $passresetModal.closeModal();
    }
});