var userSubscription;

Meteor.startup(function() {
    userSubscription = Meteor.subscribe("OneUser", Meteor.userId());
});

Template.profile.onRendered(function () {
    $(".dropdown-button").dropdown({
        hover: true, // Activate on hover
        belowOrigin: true // Displays dropdown below the button
    });
});

Template.profile.helpers({
    profilePicAttr: function () {
        return {
            src: userSubscription.ready() ? Meteor.user().services.google.picture : "",
            class: "circle responsive-img valign"
        };
    },
    name: function () {
        return Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
    },
    role: function () {
        return Meteor.user().profile.permissions.role;
    }
});