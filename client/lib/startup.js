/**
 * Created by Sergio on 12/1/2015.
 */
// this is used in the Autofill for vendors and venues
Meteor.startup(function() {
       GoogleMaps.load({
               key: 'AIzaSyCiQ5p1li8CbpVTQoN0YA4tZf__-i5C-vg',
               libraries: 'places'  // also accepts an array if you need more than one
       });
});