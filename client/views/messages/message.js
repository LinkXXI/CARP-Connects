/**
 * Created by Sergio on 12/1/2015.
 */
Template.message.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.message.helpers({
    'isUnread': function() {
        return !this.read;
    },
    'isUnreadColor': function() {
        return !this.read ? "green lighten-5" : "";
    },
    'isToOrFrom': function() {
        var value;
        if (this.type === "Outgoing") {
            value = "To: ";
        } else if (this.type === "Incoming") {
            value = "From: ";
        }
        return value;
    },
    'user': function() {
        var userId = Meteor.userId();
        var user;
        // we only want to see messages sent from ourselves and to ourselves
        if (this.from === userId) {
            user = this.to;
        } else if (this.to === userId) {
            user = this.from;
        }
        return Meteor.users.findOne({ _id: user });
    },
    'task': function() {
        return tasks.findOne({_id: this.linkedTask });
    }
});

Template.message.events({
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
    'click .message-subject-link': function (e) {
        var messageId = this._id;
        Meteor.call('messageMarkRead', messageId, function (error, result) {
            // display the error to the user and abort
            if (error) {
                //sAlert.error(MESSAGE_MARK_READ_ERROR);
                return throwError(error.reason);
            }
            else if (result) {
                //sAlert.success(MESSAGE_MARK_READ_SUCCESS);
            }
            else if (!result) {
                //sAlert.error(MESSAGE_MARK_READ_FAILED);
            }
        });
    }
});