/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageInbox.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.messageInbox.helpers({
    'isUnread': function() {
        return !this.read;
    },
    'isUnreadColor': function() {
        return !this.read ? "green lighten-5" : "";
    },
    'user': function() {
        return Meteor.users.findOne({ _id: this.from });
    },
    'task': function() {
        return tasks.findOne({_id: this.linkedTask });
    },
    'chipImgSrc': function () {
        var user = Meteor.users.findOne({_id: this.from});
        var pic = user.services && user.services.google && user.services.google.picture;
        return {
            src: pic || "/images/defaultphoto.jpg",
        };
    }
});