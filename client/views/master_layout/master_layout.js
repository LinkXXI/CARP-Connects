/**
 * Created by darkl on 9/14/2015.
 */
// this is a client-side notifications collection, and wil cause errors if run on server
Meteor.startup(function () {

    sAlert.config({
        effect: 'scale', // scale, slide, genie, jelly, flip, bouncyflip, stackslide
        position: 'top-right', // top-left, bottom-left, top-right, bottom-right, top (full width), bottom (full-width)
        timeout: 4000,
        html: false,
        onRouteClose: false,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
    });

});

Template.master.helpers({
    loggedIn: function () {
        return !(Router.current().route.getName() === "Login" ||
        Router.current().route.getName() === "ForgotPassword" ||
        Router.current().route.getName() === "Incomplete" ||
        Router.current().route.getName() === "AccountLocked" ||
        !Meteor.user());
    }
});