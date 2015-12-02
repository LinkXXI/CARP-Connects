/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageCreate.helpers({
    'users': function () {
        return Meteor.users.find({}, {sort: {name: 1}});
    }
});

Template.messageCreate.events({
    'submit #create-message-form': function (e) {
        e.preventDefault();
        var subject = $(e.target).find('#message-subject').val();
        var body = $(e.target).find('#message-body').val();
        var from = Meteor.userId();
        var to = $(e.target).find('#message-to').val();
        var createdAt = new Date();
        var outgoingMessage = {
            type: "Outgoing",
            subject: subject,
            body: body,
            read: true,
            from: from,
            to: to,
            createdAt: createdAt
        };
        var incomingMessage = {
            type: "Incoming",
            subject: subject,
            body: body,
            read: false,
            from: from,
            to: to,
            createdAt: createdAt
        };
        Meteor.call('messageInsert', outgoingMessage, incomingMessage, function (error) {
            // display the error to the user and abort
            if (error) {
                sAlert.error(MESSAGE_SEND_ERROR);
                return throwError(error.reason);
            }
            else {
                sAlert.success(MESSAGE_SEND_SUCCESS);
                //TODO: send email
                Router.go('Messages');
            }
        });
    },
    'click #clear-create-message-button': function (e) {
        e.preventDefault();
        $.find('#create-message-form')[0].reset();
    }
});