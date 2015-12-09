/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageReply.helpers({
    'from': function () {
        var from = Meteor.users.findOne({_id: this.from});
        return from;
    },
    'users': function () {
        return Meteor.users.find({role: {$ne: "incomplete"}}, {sort: {name: 1}});
    }
});

Template.messageReply.events({
    'submit #reply-message-form': function (e) {
        e.preventDefault();
        var messageToUsers = new Array();
        var to = {
            _id: this.from
        };
        messageToUsers.push(to);

        var subject = $(e.target).find('#message-subject').val();
        var body = $(e.target).find('#message-body').val();
        var from = Meteor.userId();
        var createdAt = new Date();

        var message = {
            subject: subject,
            body: body,
            from: from,
            createdAt: createdAt
        };

        var sendEmail = $('#message-send-email').is(':checked');

        Meteor.call('messageInsert', message, messageToUsers, sendEmail, function (error) {
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