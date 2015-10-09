/**
 * Created by Sergio on 10/4/2015.
 */
Template.addVenueModal.events({
    "click #cancel-add-venue-button": function (e) {
        var modal = $('#add-venue-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "submit #add-venue-form": function (e) {
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
        var venue = {
            name: $(e.target).find('#venue-name').val(),
            description: $(e.target).find('#venue-description').val(),
            hasParkingAvailability: $(e.target).find('input:radio[name=parking-availability]:checked').val(),
            hasPublicTransportationAccess: $(e.target).find('input:radio[name=public-transportation-access]:checked').val(),
            address: address
        };
        Meteor.call('venueInsert', venue, function (error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);
            // show this result but route anyway
            else {
                var modal = $('#add-venue-modal');
                modal.closeModal();
                modal.find('form')[0].reset();
            }
        });
        $('#add-venue-modal').closeModal();
    }
});
