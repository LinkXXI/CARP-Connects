Template.accountView.helpers({
    "editAllowed": function() {
        var role = Meteor.user().profile.permissions.role;
        return Meteor.userId() === this._id || role === "admin";
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
    "click #passchange-cancel": function(e) {
        e.preventDefault();
        $('#passchange-modal').closeModal();
    },
    "submit #passchange-form": function (e) {
        e.preventDefault();
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
                    var $passchangeModal = $('#passchange-modal');
                    $passchangeModal.closeModal();
                    $passchangeModal.find('form')[0].reset();
                }
            });
        } else {
            sAlert.error(ACCOUNT_CHANGE_PASSWORD_NO_MATCH);
        }
    },
    "click #passreset": function(e) {
        e.preventDefault();
        $('#passreset-modal').openModal();
    },
    "click #passreset-cancel": function(e) {
        e.preventDefault();
        $('#passreset-modal').closeModal();
    },
    "submit #passreset-form": function (e) {
        e.preventDefault();
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
            Accounts.forgotPassword(emailConfirm.address, function (err) {
                var $passresetModal = $('#passreset-modal');
                $passresetModal.closeModal();
                $passresetModal.find('form')[0].reset();
                if (err) {
                    sAlert.error(ACCOUNT_FORGOT_PASSWORD_ERROR);
                } else {
                    sAlert.success(ACCOUNT_FORGOT_PASSWORD_SUCCESS);
                }
            });
        } else {
            var $passresetModal = $('#passreset-modal');
            $passresetModal.closeModal();
            $passresetModal.find('form')[0].reset();
            sAlert.error(ACCOUNT_FORGOT_PASSWORD_EMAIL_NO_MATCH);
        }
    }
});