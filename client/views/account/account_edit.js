Template.accountEdit.rendered = function() {
};

Template.accountEdit.helpers({
    "phoneType": function() {
        return Constant.phoneType;
    }
});

Template.phone.helpers({
    "isPhoneTypeSelected": function(option, value) {
        if (option === value) {
            return {selected: true};
        } else {
            return "";
        }
    },
    "isPrimaryPhone": function () {
        if (this.primary) return "checked";
    },
    "phoneType": function() {
        return Constant.phoneType;
    }
});

Template.accountEdit.events({
    "click #passchange": function () {
        $('#passchange-modal').openModal();
    },
    "click #passchange-cancel": function () {
        $('#passchange-modal').closeModal();
    },
    "click #add-email-cancel": function () {
        $('#add-email-modal').closeModal();
    },
    "click #add-phone-cancel": function () {
        $('#add-phone-modal').closeModal();
    },
    "click #acctmgmt-cancel": function () {
        Router.go('/account');
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
        $('#add-email-modal').openModal();
    },
    "click #a-add-phone": function (event, template) {
        $('#add-phone-modal').openModal();
    },
    "submit #acctmgmt-form": function (e) {
        e.preventDefault();
        var emails = [];
        $(e.target).find("[id^='emailRow-']").each(function() {
            var i = this.id.split("emailRow-")[1];
            console.log("email i:" + i);
            emails[parseInt(i)] = {
                "address": $(e.target).find('#email-input-' + i).val(),
                "verified": !!$(e.target).find('#email-completed-' + i).is(':checked')
            };
        });
        var phones = [];
        $(e.target).find("[id^='phoneRow-']").each(function() {
            var i = this.id.split("phoneRow-")[1];
            phones[parseInt(i)] = {
                "number": $(e.target).find('#phone-number-' + i).val(),
                "type": $(e.target).find('#phone-type-' + i).val(),
                "primary": $(e.target).find('#phone-primary-' + i).is(':checked')
            };
        });

        var userFields = {
            "profile.firstName": $(e.target).find('#firstname-input').val(),
            "profile.lastName": $(e.target).find('#lastname-input').val(),
            "profile.biography": $(e.target).find('#bio-input').val(),
            "profile.skills": $(e.target).find('#skills-input').val(),
            "emails": emails,
            "profile.phones": phones
        };
        //TODO: add email and phone when edited
        Meteor.call('updateAccount', userFields, function (err) {
            if (err) {
                console.log(err);
                //throwError(err.reason);
            } else {
                Router.go('/account');
            }
        });
    },
    "submit #add-phone-form": function (e) {
        e.preventDefault();
        var phone = {
            number: $(e.target).find('#phone-number-new').val(),
            type: $(e.target).find('#phone-type-new').val(),
            primary: $(e.target).find('#phone-primary-new').is(':checked')
        };
        //TODO: meteor add audit-argument-checks
        /*
         check(password, {
         number: String,
         type: String,
         primary: Boolean
         });
         */
        Meteor.call('updatePhones', phone, function (err) {
            if (err) {
                console.log(err);
                //throwError(err.reason);
            } else {
                //TODO: Materialize bug, need to update past version 0.96 for this code to work
                // $('select').material_select();
                $('#add-phone-modal').closeModal();
                $('#add-phone-modal').find('form')[0].reset();
            }
        });
    },
    "submit #add-email-form": function (e) {
        e.preventDefault();
        var email = $(e.target).find('#email-new').val();

        Meteor.call('updateEmails', email, function (err) {
            if (err) {
                console.log(err);
                //throwError(err.reason);
            } else {
                //TODO: Materialize bug, need to update past version 0.96 for this code to work
                // $('select').material_select();
                $('#add-email-modal').closeModal();
                $('#add-email-modal').find('form')[0].reset();
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
                    $('#passchange-modal').find('form')[0].reset();
                }
            });
        } else {
            throwError("Passwords don't match.");
        }

    }
});