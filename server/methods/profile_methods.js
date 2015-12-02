/**
 * Created by Sergio on 12/1/2015.
 */
Meteor.methods({
    messageInsert: function (outgoingMessage, incomingMessage) {
        //TODO: check permission using same logic as security.js
        messages.insert(outgoingMessage);
        messages.insert(incomingMessage);
    },
    messageDelete: function (messageId) {
        messages.remove(
            {_id: messageId}
        );
        return true;
    },
    messageMarkRead: function (messageId) {
        messages.update({_id: messageId}, {
            $set: {
                read: true
            }
        });
        return true;
    }
});