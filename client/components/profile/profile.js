var userGooglePictureSubscription;

Meteor.startup(function() {
    userGooglePictureSubscription = Meteor.subscribe("UserGooglePicture");
});

Template.profile.onRendered(function () {
    $(".dropdown-button").dropdown();
});

Template.profile.helpers({
    profilePicAttr: function () {
        return {
            src: userGooglePictureSubscription.ready() ? Meteor.user().services.google.picture : "",
            class: "circle responsive-img valign",
            style: "max-height: 50px;"
        };
    },
    name: function () {
        return Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
    },
    role: function () {
        return Meteor.user().profile.permissions.role;
    }
});