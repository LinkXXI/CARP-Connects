Template.accountView.helpers({
});

Template.accountView.events({
    "click #passchange": function(){
        $('#passchange-modal').openModal();
    },
    "click #passchange-cancel": function(){
        $('#passchange-modal').closeModal();
    },
    "submit #acctmgmt-form": function (e) {
        e.preventDefault();
        var userFields = {
                "profile.firstName": $(e.target).find('#firstname-input').val(),
                "profile.lastName": $(e.target).find('#lastname-input').val(),
                "profile.biography": $(e.target).find('#bio-input').val(),
                "profile.skills": $(e.target).find('#skills-input').val()
        };
        Meteor.call('updateAccount', userFields, function (err) {
            if(err){
                console.log(err);
                //throwError(err.reason);
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
        //TODO: meteor add audit-argument-checks
        /*
        check(password, {
            current: String,
            new: String,
            confirmNew: String
        });
        */
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