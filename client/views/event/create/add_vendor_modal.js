/**
 * Created by Sergio on 10/28/2015.
 */
Template.addVendorModal.events({
    'click #address-search-modal-button': function (e) {
        $('#address-search-modal').openModal();
    },
    'click #cancel-add-vendor-button': function (e) {
        closeAndResetModal('#add-vendor-modal');

        Session.set('autofillReturnPage', undefined);
        delete Session.keys['autofillReturnPage'];
    },
    'submit #add-vendor-form': function (e) {
        e.preventDefault();
        var address = {
            line1: $(e.target).find('#vendor-address-line1').val(),
            line2: $(e.target).find('#vendor-address-line2').val(),
            line3: $(e.target).find('#vendor-address-line3').val(),
            city: $(e.target).find('#vendor-address-city').val(),
            provinceState: $(e.target).find('#vendor-address-provState').val(),
            country: $(e.target).find('#vendor-address-country option:selected').val(),
            postalZipCode: $(e.target).find('#vendor-address-postalZip').val()
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
            if (error) {
                sAlert.error(VENDOR_INSERT_ERROR);
                return throwError(error.reason);
            }
            // show this result but route anyway
            else {
                var modal = $('#add-vendor-modal');
                modal.closeModal();
                modal.find('form')[0].reset();
                sAlert.success(VENDOR_INSERT_SUCCESS);
            }
        });
        closeAndResetModal('#add-vendor-modal');

        Session.set('autofillReturnPage', undefined);
        delete Session.keys['autofillReturnPage'];
    }
});

Template.addVendorModal.helpers({
    'countries': function () {
        return Config.countries;
    }
});