/**
 * Created by Sergio on 12/1/2015.
 */
Template.messageCreate.onCreated(function () {
    Session.set('messageToUsers', undefined);
    delete Session.keys['messageToUsers'];
});

Template.messageCreate.onDestroyed(function () {
    Session.set('messageToUsers', undefined);
    delete Session.keys['messageToUsers'];
});

Template.messageCreate.helpers({
    'users': function () {
        return Meteor.users.find({role: {$ne: "incomplete"}}, {sort: {name: -1}});
    },
    'messageToUsers': function () {
        var messageToUsers = Session.get('messageToUsers') || new Array();
        return messageToUsers;
    },
    'user': function () {
        var user = Meteor.users.findOne({_id: this._id});
        return user;
    },
    'chipImgSrc': function () {
        var user = Meteor.users.findOne({_id: this._id});
        var pic = user.services && user.services.google && user.services.google.picture;
        return {
            src: pic || "/images/defaultphoto.jpg",
        };
    }
});

Template.messageCreate.events({
    'change #message-to': function (e) {
        var id = $(e.currentTarget).find(':selected').val();
        //console.log(id);
        var messageToUsers = Session.get('messageToUsers') || new Array();
        var result = $.grep(messageToUsers, function(obj){
            return obj._id === id;
        });
        if(result.length > 0) {
            //user is already is list msg
            sAlert.error(MESSAGE_ADD_USER_ALREADY_IN_LIST);
        }
        // only push the user into the array if they're not there already
        else {
            var user = Meteor.users.findOne({_id: id});
            var userInfo = {
                _id: id
            };
            messageToUsers.push(userInfo);
        }
        //console.log(messageToUsers);
        Session.set('messageToUsers', messageToUsers);
        $('#message-to').prop('selectedIndex', 0);
    },
    'click .remove-user-button': function (e) {
        var id = this._id;
        console.log(id);
        var messageToUsers = Session.get('messageToUsers') || new Array();
        var result = $.grep(messageToUsers, function(obj){
            return obj._id !== id;
        });
        console.log(result);
        Session.set('messageToUsers', result);
    },
    'submit #create-message-form': function (e) {
        e.preventDefault();
        // make sure we have at least 1 user in the recipient list
        var messageToUsers = Session.get('messageToUsers') || new Array();
        //console.log(messageToUsers);
        if (messageToUsers.length <= 0) {
            $('#message-to').focus();
            sAlert.error(MESSAGE_ERROR_NO_RECIPIENTS);
            return;
        }
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
                Router.go('Messages');
            }
        });
    },
    'click #clear-create-message-button': function (e) {
        e.preventDefault();
        $.find('#create-message-form')[0].reset();
    }
});

Template.userOption.helpers({
    selected: function () {
        if (Router.current().route.getName() === "MessageCreateForUser") {
            if (this._id === Template.parentData().userId) {
                return {selected: true};
            }
        }
    }
});