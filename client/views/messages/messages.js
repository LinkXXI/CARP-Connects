/**
 * Created by Sergio on 11/30/2015.
 */
$('ul.tabs').tabs();
Template.messages.onRendered(function () {
    $('ul.tabs').tabs();

    $('#inbox-tab').addClass('active');
    $('#inbox-div').show();
    $('#sent-items-div').hide();
});

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

Template.messages.events({
    'click .delete-message-button': function (e) {
        var messageId = this._id;
        new Confirmation({
            message: "Are you sure you want to delete this message?",
            title: "Delete Message",
            cancelText: "Cancel",
            okText: "Yes",
            success: false // true is green, false is red
        }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if (ok) {
                Meteor.call('messageDelete', messageId, function (error, result) {
                    // display the error to the user and abort
                    if (error) {
                        sAlert.error(MESSAGE_DELETE_ERROR);
                        return throwError(error.reason);
                    }
                    else if (result) {
                        sAlert.success(MESSAGE_DELETE_SUCCESS);
                    }
                    else if (!result) {
                        sAlert.error(MESSAGE_DELETE_FAILED);
                    }
                });
            }
        });
    },
    'click .mark-read-message-button': function (e) {
        var messageId = this._id;
        new Confirmation({
            message: "Are you sure you want to mark this message as being read?",
            title: "Mark as Read",
            cancelText: "Cancel",
            okText: "Yes",
            success: false // true is green, false is red
        }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if (ok) {
                Meteor.call('messageMarkRead', messageId, function (error, result) {
                    // display the error to the user and abort
                    if (error) {
                        sAlert.error(MESSAGE_MARK_READ_ERROR);
                        return throwError(error.reason);
                    }
                    else if (result) {
                        sAlert.success(MESSAGE_MARK_READ_SUCCESS);
                    }
                    else if (!result) {
                        sAlert.error(MESSAGE_MARK_READ_FAILED);
                    }
                });
            }
        });
    },
    'click #inbox-tab': function (e) {
        $('#inbox-div').show();
        $('#sent-items-div').hide();
    },
    'click #sent-items-tab': function (e) {
        $('#inbox-div').hide();
        $('#sent-items-div').show();
    }

});