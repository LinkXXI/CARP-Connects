/**
 * Created by Sergio on 11/19/2015.
 */
Template.configuration.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.configuration.events({
    "click #add-venue-button": function (e) {
        $('#add-venue-modal').openModal();
    },
    "click #add-vendor-button": function (e) {
        $('#add-vendor-modal').openModal();
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
                    Meteor.call('venueDelete', venueId, function (error) {
                        // display the error to the user and abort
                        if (error) {
                            sAlert.error(VENUE_DELETE_ERROR);
                            return throwError(error.reason);
                        }
                        else {
                            sAlert.success(VENUE_DELETE_SUCCESS);
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
                    Meteor.call('vendorDelete', vendorId, function (error) {
                        // display the error to the user and abort
                        if (error) {
                            sAlert.error(VENDOR_DELETE_ERROR);
                            return throwError(error.reason);
                        }
                        else {
                            sAlert.success(VENDOR_DELETE_SUCCESS);
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
    "vendors": function () {
        return vendors.find({}, {sort: {name: 1}});
    },
    "venues": function () {
        return venues.find({}, {sort: {name: 1}});
    }
});