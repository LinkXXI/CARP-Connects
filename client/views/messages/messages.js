/**
 * Created by Sergio on 11/30/2015.
 */
Template.messages.helpers({
    'inboxMessages': function() {
        return messages.find({type: "Incoming"}, {sort: {createdAt: -1}});
    },
    'inboxMessagesCount': function() {
        return "(" + messages.find({type: "Incoming"}).count() + ")";
    },
    'sentMessages': function() {
        return messages.find({type: "Outgoing"}, {sort: {createdAt: -1}});
    },
    'sentMessagesCount': function() {
        return "(" + messages.find({type: "Outgoing"}).count() + ")";
    },
    'hasIncomingMessages': function() {
        return messages.find({type: "Incoming"}).count() > 0;
    },
    'hasOutgoingMessages': function() {
        return messages.find({type: "Outgoing"}).count() > 0;
    },
    'hasALinkedTask': function() {
        return this.linkedTask;
    },
    'task': function() {
        return tasks.findOne({_id: this.linkedTask });
    }
});