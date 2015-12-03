Template.accountEdit.helpers({
    phoneType: function() {
        return Enumeration.phoneType;
    },
    isOnlyPhone: function() {
        if (this.profile.phones) {
            if (this.profile.phones.length > 0) {
                return;
            }
        }
        return {checked: "checked", disabled: "disabled"};
    },
    profilePicAttr: function() {
        var pic = this.services && this.services.google && this.services.google.picture;
        return {
            src: pic || "",
            //alt: "",
            class: "circle responsive-img"
        };
    }
});

Template.phone.helpers({
    isPrimaryPhone: function() {
        if (this.primary) return "checked";
    },
    phoneType: function() {
        return Enumeration.phoneType;
    }
});

Template.accountEdit.events({
    "click #acctmgmt-cancel": function(e) {
        e.preventDefault();
        Router.go('AccountView', {_id: this._id});
    },
    "click .a-resend-verification": function(e, template) {
        e.preventDefault();
        console.log(template);
        Meteor.call('resendVerificationEmail', template.data, e.target.id.split("email-")[1], function (err, data) {
            if (err || !data) {
                //TODO: throw error
            } else {

            }
        });
    },
    "click #a-add-email": function(e) {
        e.preventDefault();
        $('#add-email-modal').openModal();
    },
    "click #a-remove-email": function(e) {
        e.preventDefault();
        if ($("[id^='emailRow-']").length > 1) {
            $('#remove-email-modal').openModal();
        }
    },
    "click #a-add-phone": function(e) {
        e.preventDefault();
        $('#add-phone-modal').openModal();
    },
    "click #a-remove-phone": function(e) {
        //TODO: Optimization - update all dom manipulation to use session
        e.preventDefault();
        var i = $("[id^='phoneRow-']").length - 1;
        var $phoneRow = $("#phoneRow-" + i);
        if (i > 0) {
            if ($phoneRow.find('#phone-primary-' + i).is(':checked')) {
                document.getElementById("phone-primary-" + (i-1)).checked = true;
            }
            $phoneRow.remove();
        }
    },
    "submit #acctmgmt-form": function (e) {
        //TODO: Optimization - update all dom manipulation to use session
        e.preventDefault();
        var userId = this._id;
        var emails = [];
        $(e.target).find("[id^='emailRow-']").each(function() {
            var i = this.id.split("emailRow-")[1];
            emails[i] = {
                address: $(e.target).find('#email-input-' + i).val(),
                verified: !!$(e.target).find('#email-completed-' + i).is(':checked')
            };
        });
        var phones = [];
        $(e.target).find("[id^='phoneRow-']").each(function() {
            var i = this.id.split("phoneRow-")[1];
            phones[i] = {
                number: $(e.target).find('#phone-number-' + i).val(),
                type: $(e.target).find('#phone-type-' + i).val(),
                primary: $(e.target).find('#phone-primary-' + i).is(':checked')
            };
        });

        var userFields = {
            "profile.firstName": $(e.target).find('#firstname-input').val(),
            "profile.lastName": $(e.target).find('#lastname-input').val(),
            "profile.biography": $(e.target).find('#bio-input').val(),
            "profile.skills": $(e.target).find('#skills-input').val(),
            emails: emails,
            "profile.phones": phones
        };
        Meteor.call('updateAccount', userId, userFields, function (err) {
            if (err) {
                console.log(err);
                //throwError(err.reason);
            } else {
                history.go(-1);
            }
        });
    },
    "submit #add-phone-form": function (e) {
        e.preventDefault();
        var userId = this._id;
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
        Meteor.call('updatePhones', userId, phone, function (err) {
            if (err) {
                console.log(err);
                //throwError(err.reason);
            } else {
                //TODO: Materialize bug, need to update past version 0.96 for this code to work
                // $('select').material_select();
                var $addPhoneModal = $('#add-phone-modal');
                $addPhoneModal.closeModal();
                $addPhoneModal.find('form')[0].reset();
            }
        });
    },
    "submit #add-email-form": function (e) {
        e.preventDefault();
        var userId = this._id;
        var email = $(e.target).find('#email-new').val();

        Meteor.call('updateEmails', userId, email, function (err) {
            if (err) {
                console.log(err);
                //throwError(err.reason);
            } else {
                //TODO: Materialize bug, need to update past version 0.96 for this code to work
                // $('select').material_select();
                var $addEmailModal = $('#add-email-modal');
                $addEmailModal.closeModal();
                $addEmailModal.find('form')[0].reset();
            }
        });
    },
    "submit #remove-email-form": function (e) {
        e.preventDefault();
        var userId = this._id;
        var email = $(e.target).find("input[type=radio]:checked").val();

        Meteor.call('removeEmails', userId, email, function (err) {
            if (err) {
                console.log(err);
                //throwError(err.reason);
            } else {
                //TODO: Materialize bug, need to update past version 0.96 for this code to work
                // $('select').material_select();
                var $removeEmailModal = $('#remove-email-modal');
                $removeEmailModal.closeModal();
                $removeEmailModal.find('form')[0].reset();
            }
        });
    }
});