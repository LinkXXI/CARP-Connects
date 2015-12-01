var userSubscription;

//Template.profile.onCreated(function () {
Tracker.autorun(function () {
    if (Meteor.user()) {
        userSubscription = Meteor.subscribe("OneUser", Meteor.userId()); // one of the few subscriptions outside routes.js, its a dependency for profile
        Meteor.subscribe("Messages", Meteor.userId());
    }
});

Template.profile.onRendered(function () {
    $("#dropdown-button-mobile").dropdown({
        hover: false, // Activate on hover
        belowOrigin: true, // Displays dropdown below the button
        constrain_width: false
    });
    $("#dropdown-button-large").dropdown({
        hover: true, // Activate on hover
        belowOrigin: true, // Displays dropdown below the button
        constrain_width: false
    });
});

Template.profile.helpers({
    profilePicAttr: function () {
        return {
            src: userSubscription.ready() && Meteor.user().profile.googleLinked ? Meteor.user().services.google.picture : "",
            class: "circle responsive-img valign"
        };
    },
    name: function () {
        return Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
    },
    profilePath: function() {
        return Router.routes.AccountView.path({_id:Meteor.userId()});
    },
    role: function () {
        var role = Meteor.user().profile.permissions.role;
        if (role) {
            switch (role) {
                case "Admin":
                    return "Administrator";
                case "user":
                    return "Volunteer";
                default:
                    return role;
            }
        }
        return "";
    },
    'hasNewIncomingMessages': function () {
        return messages.find({
                $and: [
                    { type: "Incoming" },
                    { read: false }
                ]
            }).count() > 0;
    },
    'newIncomingMessageCount': function () {
        return messages.find({
            $and: [
                { type: "Incoming" },
                { read: false }
            ]
        }).count();
    }
});