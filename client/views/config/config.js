/**
 * Created by Sergio on 11/19/2015.
 */
Template.configuration.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.configuration.events({
    'click #add-theme-button': function (e) {
        $('#add-theme-modal').openModal();
    },
    'click #add-phonetype-button': function (e) {
        $('#add-phonetype-modal').openModal();
    },
    'click #add-venue-button': function (e) {
        $('#add-venue-modal').openModal();
    },
    'click #add-vendor-button': function (e) {
        $('#add-vendor-modal').openModal();
    },
    'click #delete-theme-button': function (e) {
        var themeId = $('#theme option:selected').val();
        if (themeId !== "") {
            new Confirmation({
                message: "Are you sure you want to permanently remove this theme?",
                title: "Delete Theme",
                cancelText: "Cancel",
                okText: "Yes",
                success: false // true is green, false is red
            }, function (ok) {
                // ok is true if the user clicked on "ok", false otherwise
                if (ok) {
                    Meteor.call('themeDelete', themeId, function (error, result) {
                        // display the error to the user and abort
                        if (error) {
                            sAlert.error(THEME_DELETE_ERROR);
                            return throwError(error.reason);
                        }
                        else if (result) {
                            sAlert.success(THEME_DELETE_SUCCESS);
                        }
                        else if (!result) {
                            sAlert.error(THEME_DELETE_FAILED);
                        }
                    });
                }
            });
        }
        else {
            sAlert.info(THEME_DELETE_NONESELECTED);
        }
    },
    'click #delete-phonetype-button': function (e) {
        var phoneTypeId = $('#phonetype-select option:selected').val();
        if (phoneTypeId !== "") {
            new Confirmation({
                message: "Are you sure you want to permanently remove this phone type?",
                title: "Delete Phone Type",
                cancelText: "Cancel",
                okText: "Yes",
                success: false // true is green, false is red
            }, function (ok) {
                // ok is true if the user clicked on "ok", false otherwise
                if (ok) {
                    Meteor.call('phonetypeDelete', phoneTypeId, function (error, result) {
                        // display the error to the user and abort
                        if (error) {
                            sAlert.error(PHONETYPE_DELETE_ERROR);
                            return throwError(error.reason);
                        }
                        else if (result) {
                            sAlert.success(PHONETYPE_DELETE_SUCCESS);
                        }
                        else if (!result) {
                            sAlert.error(PHONETYPE_DELETE_FAILED);
                        }
                    });
                }
            });
        }
        else {
            sAlert.info(PHONETYPE_DELETE_NONESELECTED);
        }
    },
    'click #delete-venue-button': function (e) {
        var venueId = $('#venue option:selected').val();
        if (venueId !== "") {
            new Confirmation({
                message: "Are you sure you want to permanently remove this venue?",
                title: "Delete Venue",
                cancelText: "Cancel",
                okText: "Yes",
                success: false // true is green, false is red
            }, function (ok) {
                // ok is true if the user clicked on "ok", false otherwise
                if (ok) {
                    Meteor.call('venueDelete', venueId, function (error, result) {
                        // display the error to the user and abort
                        if (error) {
                            sAlert.error(VENUE_DELETE_ERROR);
                            return throwError(error.reason);
                        }
                        else if (result) {
                            sAlert.success(VENUE_DELETE_SUCCESS);
                        }
                        else if (!result) {
                            sAlert.error(VENUE_DELETE_FAILED);
                        }
                    });
                }
            });
        }
        else {
            sAlert.info(VENUE_DELETE_NONESELECTED);
        }
    },
    'click #delete-vendor-button': function (e) {
        var vendorId = $('#vendor option:selected').val();
        if (vendorId !== "") {
            new Confirmation({
                message: "Are you sure you want to permanently remove this vendor?",
                title: "Delete Vendor",
                cancelText: "Cancel",
                okText: "Yes",
                success: false // true is green, false is red
            }, function (ok) {
                // ok is true if the user clicked on "ok", false otherwise
                if (ok) {
                    Meteor.call('vendorDelete', vendorId, function (error, result) {
                        // display the error to the user and abort
                        if (error) {
                            sAlert.error(VENDOR_DELETE_ERROR);
                            return throwError(error.reason);
                        }
                        else if (result) {
                            sAlert.success(VENDOR_DELETE_SUCCESS);
                        }
                        else if (!result) {
                            sAlert.error(VENDOR_DELETE_FAILED);
                        }
                    });
                }
            });
        }
        else {
            sAlert.info(VENDOR_DELETE_NONESELECTED);
        }
    }
});

Template.configuration.helpers({
    'themes': function () {
        return themes.find({}, {sort: {name: 1}});
    },
    'vendors': function () {
        return vendors.find({}, {sort: {name: 1}});
    },
    'venues': function () {
        return venues.find({}, {sort: {name: 1}});
    },
    phoneTypes: function() {
        return phonetypes.find();
    }
});

Template.addPhoneTypeModal.events({
    "submit #add-phonetype-form": function (e) {
        e.preventDefault();
        var phonetype = {
            type: $(e.target).find('#phonetype-new').val()
        };
        Meteor.call('phonetypeInsert', phonetype, function (error, result) {
            // display the error to the user and abort
            if (error) {
                sAlert.error(PHONETYPE_INSERT_ERROR);
                return throwError(error.reason);
            }
            // show this result but route anyway
            else {
                sAlert.success(PHONETYPE_INSERT_SUCCESS);
            }
        });
        closeAndResetModal('#add-phonetype-modal');
    }
});