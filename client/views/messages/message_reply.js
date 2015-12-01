/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageReply.helpers({
    'from': function () {
        var from = Meteor.users.findOne({_id: this.from});
        return from;
    },
    'users': function () {
        return Meteor.users.find({}, {sort: {name: 1}});
    }
});

Template.messageReply.events({
    'submit #reply-message-form': function (e) {
        e.preventDefault();
        var subject = $(e.target).find('#message-subject').val();
        var body = $(e.target).find('#message-body').val();
        var from = Meteor.userId();
        var to = this.from;
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
    'click #clear-reply-message-button': function (e) {
        e.preventDefault();
        $.find('#reply-message-form')[0].reset();
    }
});