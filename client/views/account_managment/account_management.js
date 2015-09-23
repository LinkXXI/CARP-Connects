Template.accountManagement.helpers({
});

Template.accountManagement.events({
    "click #passchange": function(){
        $('#passchange-modal').openModal();
    },
    "click #passchange-cancel": function(){
        $('#passchange-modal').closeModal();
    },
    "submit #acctmgmt-form": function (e) {
        e.preventDefault();
        var userFields = {
            first: $(e.target).find('#firstname-input').val(),
            last: $(e.target).find('#lastname-input').val(),
            bio: $(e.target).find('#bio-input').val(),
            skills: $(e.target).find('#skills-input').val()
        };

        Meteor.call('updateAccount', userFields, function (err, result) {
            if(err){
                console.log(err);
                throwError(err.reason);
            } else {
                Router.go('/');
            }
        });
    },
    "submit #passchange-form": function (e) {
        e.preventDefault();
        var password = {
            current:$(e.target).find('#curpassword').val(),
            new: $(e.target).find('#newpassword').val(),
            confirmNew: $(e.target).find('#new2password').val()
        };
        check(password, {
            current: String,
            new: String,
            confirmNew: String
        });
        if (password.new === password.confirmNew) {
            Accounts.changePassword(password.current, password.new, function(err){
                if(err){
                    throwError(err.reason);
                } else {
                    $('#passchange-modal').closeModal();
                }
            });
        } else {
            throwError("Passwords don't match.");
        }

    }
});