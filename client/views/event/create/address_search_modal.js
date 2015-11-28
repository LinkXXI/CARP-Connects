/**
 * Created by Sergio on 11/28/2015.
 */
Template.addressSearchModal.onRendered(function () {
    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            console.log("Google Maps Loaded");
            $("#geocomplete").geocomplete({
                map: $("#map_canvas"),
                mapOptions: {
                    zoom: 14
                }
            }).bind("geocode:result", function (event, result) {
                console.log("Result: " + result.formatted_address);
            }).bind("geocode:error", function (event, status) {
                console.log("ERROR: " + status);
            }).bind("geocode:multiple", function (event, results) {
                console.log("Multiple: " + results.length + " results found");
            });
        }
    });
});

Template.addressSearchModal.events({
    'click #cancel-address-search-button': function (e) {
        closeAndResetModal('#address-search-modal');
    },
    'click #find-address-search-button': function (e) {
        $('#geocomplete').trigger("geocode");
    },
    'submit #address-search-form': function (e) {
        e.preventDefault();
        closeAndResetModal('#address-search-modal');
    }
});