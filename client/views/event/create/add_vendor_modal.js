/**
 * Created by Sergio on 10/28/2015.
 */
Template.addVendorModal.events({
    'click #cancel-add-vendor-button': function (e) {
        var modal = $('#add-vendor-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "submit #add-vendor-form": function (e) {
        e.preventDefault();
        var address = {
            line1: $(e.target).find('#venue-address-line1').val(),
            line2: $(e.target).find('#venue-address-line2').val(),
            line3: $(e.target).find('#venue-address-line1').val(),
            city: $(e.target).find('#venue-address-city').val(),
            provState: $(e.target).find('#venue-address-provState').val(),
            country: $(e.target).find('#venue-address-country').val(),
            postalZip: $(e.target).find('#venue-address-postalZip').val()
        };
        var vendor = {
            name: $(e.target).find('#vendor-name').val(),
            contactPerson: $(e.target).find('#vendor-contact-person').val(),
            contactNumber: $(e.target).find('#vendor-contact-number').val(),
            contactEmail: $(e.target).find('#vendor-contact-email').val(),
            address: address
        };
        Meteor.call('vendorInsert', vendor, function (error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);
            // show this result but route anyway
            else {
                var modal = $('#add-vendor-modal');
                modal.closeModal();
                modal.find('form')[0].reset();
            }
        });
        $('#add-vendor-modal').closeModal();
    }
});