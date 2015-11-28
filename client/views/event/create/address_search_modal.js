/**
 * Created by Sergio on 11/28/2015.
 */
Template.addressSearchModal.onRendered(function () {
    this.autorun(function () {
        if (GoogleMaps.loaded()) {
            $("#geocomplete").geocomplete({
                map: $('#map_canvas'),
                mapOptions: {
                    zoom: 13
                }
            }).bind("geocode:result", function (event, result) {
                // resize needed to get map to display -- !!!!! 2 hours to find this
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
    'submit #address-search-form': function (e) {
        e.preventDefault();
        closeAndResetModal('#address-search-modal');
    }
});