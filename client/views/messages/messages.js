/**
 * Created by Sergio on 11/30/2015.
 */
Template.messages.helpers({
    'messages': function() {
        return messages.find();
    },
    'hasMessages': function() {
        return messages.find().count() > 0;
    }
});