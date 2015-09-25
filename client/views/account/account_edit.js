Template.accountEdit.rendered = function() {
    $('select').material_select();
};

Template.accountEdit.helpers({
    "isPhoneTypeSelected": function(option, value) {
        if (option === value) {
            return 'selected';
        } else {
            return ''
        }
    },
    "isPrimaryPhone": function () {
        if (this.primary) return "checked";
    },
    "phoneType": function() {
        return Enumeration.phoneType;
    }
});

Template.accountEdit.events({
    "click #passchange": function () {
        $('#passchange-modal').openModal();
    },
    "click #passchange-cancel": function () {
        $('#passchange-modal').closeModal();
    },
    "click .a-resend-verification": function (e) {
        Meteor.call('resendVerificationEmail', e.target.id.split("email-")[1], function (err, data) {
            if (err || !data) {
                //TODO: throw error
            } else {

            }
        });
    },
    "click #a-add-email": function () {
        var output = '<tr><td><input type="email" class="new-email"></td><td></td></tr>';
        $(output).insertBefore("#add-email");
    },
    "submit #acctmgmt-form": function (e) {
        e.preventDefault();
        var userFields = {
            "profile.firstName": $(e.target).find('#firstname-input').val(),
            "profile.lastName": $(e.target).find('#lastname-input').val(),
            "profile.biography": $(e.target).find('#bio-input').val(),
            "profile.skills": $(e.target).find('#skills-input').val()
        };
        var emails = [];
        $(".new-email").each(function() {
           emails.push(this.value);
        });
        Meteor.call('updateAccount', userFields, emails, function (err) {
            if (err) {
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
                    $('#passchange-modal').closeModal();
                }
            });
        } else {
            throwError("Passwords don't match.");
        }

    }
});