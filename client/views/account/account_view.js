Template.accountView.helpers({
    "loggedIn": function() {
        return Meteor.userId() === this._id;
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
                    throwError(err.reason);
                } else {
                    var $passchangeModal = $('#passchange-modal');
                    $passchangeModal.closeModal();
                    $passchangeModal.find('form')[0].reset();
                }
            });
        } else {
            throwError("Passwords don't match.");
        }
    }
});