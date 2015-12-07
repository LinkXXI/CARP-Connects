/**
 * Created by Sergio on 11/30/2015.
 */
Template.messages.helpers({
    'inboxMessages': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Incoming"},
                    {toSingleUser: userId}
                ]
            }, {sort: {createdAt: -1}}
        );
    },
    'inboxTotalMessagesCount': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Incoming"},
                    {toSingleUser: userId}
                ]
            }).count();
    },
    'inboxUnreadMessagesCount': function () {
        var userId = Meteor.userId();
        return messages.find({
            $and: [
                {type: "Incoming"},
                {read: false},
                {toSingleUser: userId}
            ]
        }).count();
    },
    'sentMessages': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Outgoing"},
                    {from: userId}
                ]
            }, {sort: {createdAt: -1}}
        );
    },
    'sentMessagesCount': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Outgoing"},
                    {from: userId}
                ]
            }).count();
    },
    'hasALinkedTask': function () {
        return this.linkedTask;
    },
    'task': function () {
        return tasks.findOne({_id: this.linkedTask});
    }
});