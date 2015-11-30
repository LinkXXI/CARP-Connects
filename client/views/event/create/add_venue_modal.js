/**
 * Created by Sergio on 10/4/2015.
 */
Template.addVenueModal.events({
    'click #address-search-modal-button': function (e) {
        $('#address-search-modal').openModal();
    },
    'click #cancel-add-venue-button': function (e) {
        closeAndResetModal('#add-venue-modal');

        Session.set('autofillReturnPage', undefined);
        delete Session.keys['autofillReturnPage'];
    },
    'submit #add-venue-form': function (e) {
        e.preventDefault();
        var address = {
            line1: $(e.target).find('#venue-address-line1').val(),
            line2: $(e.target).find('#venue-address-line2').val(),
            line3: $(e.target).find('#venue-address-line3').val(),
            city: $(e.target).find('#venue-address-city').val(),
            provinceState: $(e.target).find('#venue-address-provState').val(),
            country: $(e.target).find('#venue-address-country option:selected').val(),
            postalZipCode: $(e.target).find('#venue-address-postalZip').val()
        };
        var venue = {
            name: $(e.target).find('#venue-name').val(),
            description: $(e.target).find('#venue-description').val(),
            hasParkingAvailability: $(e.target).find('input:radio[name=parking-availability]:checked').val(),
            hasPublicTransportationAccess: $(e.target).find('input:radio[name=public-transportation-access]:checked').val(),
            address: address
        };
        Meteor.call('venueInsert', venue, function (error, result) {
            // display the error to the user and abort
            if (error) {
                sAlert.error(VENUE_INSERT_ERROR);
                return throwError(error.reason);
            }
            // show this result but route anyway
            else {
                var modal = $('#add-venue-modal');
                modal.closeModal();
                modal.find('form')[0].reset();
                sAlert.success(VENUE_INSERT_SUCCESS);
            }
        });
        closeAndResetModal('#add-venue-modal');

        Session.set('autofillReturnPage', undefined);
        delete Session.keys['autofillReturnPage'];
    }
});

Template.addVenueModal.helpers({
    'countries': function () {
        return Config.countries;
    }
});