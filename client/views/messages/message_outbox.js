/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageOutbox.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.messageOutbox.helpers({
    'isUnread': function() {
        return !this.read;
    },
    'isUnreadColor': function() {
        return !this.read ? "green lighten-5" : "";
    },
    'user': function() {
        return Meteor.users.findOne({ _id: this._id });
    },
    'task': function() {
        return tasks.findOne({_id: this.linkedTask });
    },
    'chipImgSrc': function () {
        var user = Meteor.users.findOne({_id: this._id});
        return {
            src: user.profile.googleLinked ? user.services.google.picture : "/images/bluehead.png",
        };
    }
});