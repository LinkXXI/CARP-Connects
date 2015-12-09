/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageReplyAll.helpers({
    'from': function () {
        var from = Meteor.users.findOne({_id: this.from});
        return from;
    },
    'users': function () {
        return Meteor.users.find({}, {sort: {name: -1}});
    },
    'replyAllUsers': function () {
        //console.log(this);
        var users = this.to;
        var from = this.from;
        // check if send if in the to list
        users = $.grep(users, function( obj ) {
            return obj._id !== from;
        });
        var user = {
            _id: from
        };
        users.push(user);

        var userList = new Array();

        $.each(users, function(i, user) {
            var u = Meteor.users.findOne({_id: user._id});
            userList.push(u);
        });

        //console.log(userList);
        return userList;
    }
});

Template.messageReplyAll.events({
    'submit #reply-message-form': function (e) {
        e.preventDefault();
        var users = this.to;
        var from = this.from;
        // check if send if in the to list
        users = $.grep(users, function( obj ) {
            return obj._id !== from;
        });
        var user = {
            _id: from
        };
        users.push(user);

        var messageToUsers = new Array();

        $.each(users, function(i, user) {
            var u = Meteor.users.findOne({_id: user._id});
            messageToUsers.push(u);
        });

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