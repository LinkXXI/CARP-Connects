Template.eventCard.helpers({
    mapAttributes: function () {
        var venue = venues.findOne({_id: this.venue});
        return {
            frameborder: "0",
            style: "border:0",
            src: "https://www.google.com/maps/embed/v1/place?q='" +
            encodeURIComponent(venue.name.trim()) +
            encodeURIComponent(venue.address.city.trim()) + ',' +
            encodeURIComponent(venue.address.provinceState.trim()) + ',' +
            encodeURIComponent(venue.address.postalZipCode.trim()) + ',' +
            encodeURIComponent(venue.address.country.trim()) +
            "'&key=AIzaSyDez5ZF6K_UOr8izzd4PkXyWpAzG1dwTJQ"
        }
    }
});