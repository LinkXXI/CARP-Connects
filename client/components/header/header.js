Template.header.onRendered(function () {
    $(".dropdown-button").dropdown();
});

Template.header.helpers({
    profilePicAttr: function () {
        return {
            src: Meteor.user().services.google.picture,
            class: "circle responsive-img"
        };
    },
    name: function () {
        return Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
    }
});