/**
 * Created by Sergio on 11/30/2015.
 */
Template.messages.helpers({
    'inboxMessages': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Incoming"},
                    {to: userId}
                ]
            }, {sort: {createdAt: -1}}
        );
    },
    'inboxTotalMessagesCount': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Incoming"},
                    {to: userId}
                ]
            }).count();
    },
    'inboxUnreadMessagesCount': function () {
        var userId = Meteor.userId();
        return messages.find({
            $and: [
                {type: "Incoming"},
                {read: false},
                {to: userId}
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
    'hasIncomingMessages': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Incoming"},
                    {to: userId}
                ]
            }).count() > 0;
    },
    'hasOutgoingMessages': function () {
        var userId = Meteor.userId();
        return messages.find({
                $and: [
                    {type: "Outgoing"},
                    {from: userId}
                ]
            }).count() > 0;
    },
    'hasALinkedTask': function () {
        return this.linkedTask;
    },
    'task': function () {
        return tasks.findOne({_id: this.linkedTask});
    }
});