/**
 * Created by Sergio on 9/24/2015.
 */
Template.registerHelper('siteTitle', function() {
    return Config.siteTitle;
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper('formatDateShort', function(date) {
    return moment(date).format('MMM Do YYYY, h:mm a');
});

Template.registerHelper('formatDateMDYT', function(date) {
    return moment(date).format('M/D/YYYY h:mm a');
});

Template.registerHelper('formatCurrency', function(amount) {
    return "$" + parseFloat(amount).toFixed(2);
});

Template.registerHelper('isOptionSelected', function(option, value) {
    if (option === value) {
        return {selected: true};
    } else {
        return "";
    }
});

Template.registerHelper('isOptionSelectedReadOnly', function(option, value) {
    if (option === value) {
        return {selected: true};
    } else {
        return {disabled: true};
    }
});

Template.registerHelper('hasValueMarkActive', function(value) {
    if (value) {
        return {class: "active"};
    }
});

Template.registerHelper('mapAttributes', function () {
    var venue = venues.findOne({_id: this.venue});
    var zoom = 13;
    return {
        frameborder: "0",
        style: "border:0",
        src: "https://www.google.com/maps/embed/v1/place?q='" +
        encodeURIComponent(venue.name.trim()) +
        encodeURIComponent(venue.address.line1.trim()) + ',' +
        encodeURIComponent(venue.address.city.trim()) + ',' +
        encodeURIComponent(venue.address.provinceState.trim()) + ',' +
        encodeURIComponent(venue.address.postalZipCode.trim()) + ',' +
        encodeURIComponent(venue.address.country.trim()) + ',' +
        "&zoom=" + zoom +
        "'&key=AIzaSyDez5ZF6K_UOr8izzd4PkXyWpAzG1dwTJQ"
    }
});

Template.registerHelper('mapAttributesFromVenueSelect', function () {
    var venueId;
    venueId = Session.get('venueId');
    if (!venueId) {
        venueId = $('#venue option:selected').val();
    }
    if (!venueId) {
        venueId = this.venue;
    }
    var venue = venues.findOne({_id: venueId});

    var zoom = 13;
    return {
        frameborder: "0",
        style: "border:0",
        src: "https://www.google.com/maps/embed/v1/place?q='" +
        encodeURIComponent(venue.name.trim()) +
        encodeURIComponent(venue.address.line1.trim()) + ',' +
        encodeURIComponent(venue.address.city.trim()) + ',' +
        encodeURIComponent(venue.address.provinceState.trim()) + ',' +
        encodeURIComponent(venue.address.postalZipCode.trim()) + ',' +
        encodeURIComponent(venue.address.country.trim()) + ',' +
        "&zoom=" + zoom +
        "'&key=AIzaSyDez5ZF6K_UOr8izzd4PkXyWpAzG1dwTJQ"
    }
});

Template.registerHelper('mapAttributesGooglePlaces', function (place) {
    //console.log(place);
    var zoom = 13;
    return {
        frameborder: "0",
        style: "border:0",
        src: "https://www.google.com/maps/embed/v1/place?q='" +
        encodeURIComponent(place.trim()) +
        "&zoom=" + zoom +
        "'&key=AIzaSyDez5ZF6K_UOr8izzd4PkXyWpAzG1dwTJQ"
    }
});

Template.registerHelper('trimParagraph', function(paragraph, chars) {
    var newParagraph = paragraph;
    if (paragraph.length > chars) {
        newParagraph = paragraph.substring(0, chars) + ' ...';
    }
    return newParagraph;
});
