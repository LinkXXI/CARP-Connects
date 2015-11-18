Template.accountView.helpers({
    editAllowed: function() {
        var role = Meteor.user().profile.permissions.role;
        return Meteor.userId() === this._id || role === "Administrator";
    },
    changePassword: function() {
        return Meteor.userId() === this._id; //allow password change since user profile is for current user
    },
    profilePicAttr: function() {
        return {
            src: this.services.google.picture,
            alt: "",
            class: "circle responsive-img"
        };
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
    }
});