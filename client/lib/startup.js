/**
 * Created by Sergio on 11/28/2015.
 */
Meteor.startup(function() {
    GoogleMaps.load({
        key: 'AIzaSyC6JXK90Y04XIuClkNpv2ozUToqIf3TY5o',
        libraries: 'places'  // also accepts an array if you need more than one
    });
});