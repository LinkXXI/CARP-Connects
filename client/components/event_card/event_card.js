Template.eventCard.helpers({
    mapAttributes: function () {
        return {
            frameborder: "0",
            style: "border:0",
            src: "https://www.google.com/maps/embed/v1/place?q='" +
            encodeURIComponent(this.venue.name.trim()) +
            encodeURIComponent(this.venue.address.city.trim()) + ',' +
            encodeURIComponent(this.venue.address.provinceState.trim()) + ',' +
            encodeURIComponent(this.venue.address.postalZipCode.trim()) + ',' +
            encodeURIComponent(this.venue.address.country.trim()) +
            "'&key=AIzaSyDez5ZF6K_UOr8izzd4PkXyWpAzG1dwTJQ"
        }
    }
});