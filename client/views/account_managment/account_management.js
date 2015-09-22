Template.accountManagement.helpers({
    name: function() {
        return Meteor.user.name;
    },
    bio: function() {
        return Meteor.user.bio;
    },
    skills: function() {
        return Meteor.user.skills;
    },
    copyright: function() {
        return "&copy; " + (new Date()).getFullYear() + " CARP Connects"
    }
});