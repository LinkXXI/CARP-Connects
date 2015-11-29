/**
 * Created by Sergio on 11/28/2015.
 */
var place = {};
Template.addressSearchModal.onRendered(function () {
    Session.set('place', undefined);
    delete Session.keys['place'];

    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            $("#geocomplete").geocomplete({
                types: ["establishment"]
            }).bind("geocode:result", function (event, result) {
                if (result) {
                    //console.log(result);
                    //console.log('Name: ' + result.name);
                    place.name = result.name;
                    $.each(result.address_components, function (i, component) {
                        //console.log(component);
                        $.each(component.types, function (j, type) {
                            if (type === 'street_number') {
                                //console.log('Street Number: ' + component.long_name);
                                place.streetNumber = component.long_name;
                            }
                            if (type === 'route') {
                                //console.log('Street: ' + component.long_name);
                                place.street = component.long_name;
                            }
                            if (type === 'locality') {
                                //console.log('City: ' + component.long_name);
                                place.city = component.long_name;
                            }
                            if (type === 'administrative_area_level_1') {
                                //console.log('Province: ' + component.long_name);
                                place.province = component.long_name;
                            }
                            if (type === 'country') {
                                //console.log('Country: ' + component.long_name);
                                place.country = component.long_name;
                            }
                            if (type === 'postal_code') {
                                //console.log('Postal Code: ' + component.long_name);
                                place.postalCode = component.long_name;
                            }
                            if (type === 'neighborhood') {
                                //console.log('Neighborhood: ' + component.long_name);
                                place.neighborhood = component.long_name;
                            }
                            if (type === 'sublocality') {
                                //console.log('Sublocality: ' + component.long_name);
                                place.sublocality = component.long_name;
                            }
                            if (type === 'administrative_area_level_2') {
                                //console.log('County: ' + component.long_name);
                                place.county = component.long_name;
                            }
                        });
                    });
                    //console.log("Result: " + result.formatted_address);
                    Session.set('place', result.formatted_address);
                }
            }).bind("geocode:error", function (event, status) {
                console.log("ERROR: " + status);
            }).bind("geocode:multiple", function (event, results) {
                console.log("Multiple: " + results.length + " results found");
            });
        }
    });
});

Template.addressSearchModal.onDestroyed(function () {
    Session.set('place', undefined);
    delete Session.keys['place'];
});

Template.addressSearchModal.helpers({
    'place': function () {
        return Session.get('place');
    }
});

Template.addressSearchModal.events({
    'click #cancel-address-search-button': function (e) {
        closeAndResetModal('#address-search-modal');

        Session.set('place', undefined);
        delete Session.keys['place'];
    },
    'submit #address-search-form': function (e) {
        e.preventDefault();
        var autofillReturnPage = Session.get('autofillReturnPage');
        console.log(autofillReturnPage);
        console.log(place);

        if (autofillReturnPage === "addVendorModal") {
            var addressLine1 = $('#vendor-address-line1');
            if (place.streetNumber) {
                addressLine1.val(place.streetNumber);
            }
            if (place.street) {
                addressLine1.val(addressLine1.val() + " " + place.street);
            }
            addressLine1.addClass('validate valid');
            $("label[for='" + $(addressLine1).attr('id') + "']").addClass('active');

            var city = $('#vendor-address-city');
            if (place.city) {
                city.val(place.city);
            }
            city.addClass('validate valid');
            $("label[for='" + $(city).attr('id') + "']").addClass('active');

            var province = $('#vendor-address-provState');
            if (place.province) {
                province.val(place.province);
            }
            province.addClass('validate valid');
            $("label[for='" + $(province).attr('id') + "']").addClass('active');

            var postalCode = $('#vendor-address-postalZip');
            if (place.postalCode) {
                postalCode.val(place.postalCode);
            }
            postalCode.addClass('validate valid');
            $("label[for='" + $(postalCode).attr('id') + "']").addClass('active');

            var country = $('#vendor-address-country');
            if (place.country) {
                country.val(place.country);
            }
            country.addClass('validate valid');
            $("label[for='" + $(country).attr('id') + "']").addClass('active');
        }
        else if (autofillReturnPage === "addVenueModal") {
            var addressLine1 = $('#venue-address-line1');
            if (place.streetNumber) {
                addressLine1.val(place.streetNumber);
            }
            if (place.street) {
                addressLine1.val(addressLine1.val() + " " + place.street);
            }
            addressLine1.addClass('validate valid');
            $("label[for='" + $(addressLine1).attr('id') + "']").addClass('active');

            var city = $('#venue-address-city');
            if (place.city) {
                city.val(place.city);
            }
            city.addClass('validate valid');
            $("label[for='" + $(city).attr('id') + "']").addClass('active');

            var province = $('#venue-address-provState');
            if (place.province) {
                province.val(place.province);
            }
            province.addClass('validate valid');
            $("label[for='" + $(province).attr('id') + "']").addClass('active');

            var postalCode = $('#venue-address-postalZip');
            if (place.postalCode) {
                postalCode.val(place.postalCode);
            }
            postalCode.addClass('validate valid');
            $("label[for='" + $(postalCode).attr('id') + "']").addClass('active');

            var country = $('#venue-address-country');
            if (place.country) {
                country.val(place.country);
            }
            country.addClass('validate valid');
            $("label[for='" + $(country).attr('id') + "']").addClass('active');
        }
        closeAndResetModal('#address-search-modal');

        Session.set('place', undefined);
        delete Session.keys['place'];
    }
});