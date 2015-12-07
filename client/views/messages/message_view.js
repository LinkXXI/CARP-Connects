/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageView.helpers({
    'from': function () {
        return Meteor.users.findOne({_id: this.from});
    },
    'user': function () {
        var user = Meteor.users.findOne({_id: this._id});
        return user;
    }
});

Template.messageView.events({
    'click #delete-message-button': function (e) {
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
                        Router.go('Messages');
                    }
                    else if (!result) {
                        sAlert.error(MESSAGE_DELETE_FAILED);
                    }
                });
            }
        });
    }
});