/**
 * Created by Sergio on 12/1/2015.
 */
Meteor.methods({
    messageInsert: function (outgoingMessage, incomingMessage) {
        //TODO: check permission using same logic as security.js
        messages.insert(outgoingMessage);
        messages.insert(incomingMessage);

        var taskHelpEmailConfig = configuration.findOne({name: 'config-task-help-email'});
        // send email to event owner about linked task
        // check if there is a linked task and the config value to send email for help requests is set to true
        if (outgoingMessage.linkedTask && taskHelpEmailConfig.value) {
            sendTaskHelpRequestEmail(outgoingMessage);
        }
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


var sendTaskHelpRequestEmail = function (email, outgoingMessage) {
    var task = tasks.findOne({_id: outgoingMessage.linkedTask});
    var from = Meteor.users.findOne({_id: outgoingMessage.from});
    var to = Meteor.users.findOne({_id: outgoingMessage.to});
    var email = to.emails[0].address;
    Email.send({
        to: email,
        from: Accounts.emailTemplates.from,
        subject: "You have a task help request from " + from.profile.firstName + " " + from.profile.lastName,
        html: "Hello " + to.profile.firstName + " " + to.profile.lastName + ",<br><br>"
        + "You have a task help request.<br><br>"
        + from.profile.firstName + " " + from.profile.lastName + " needs help with the task: " + task.name + "<br>"
        + "You can work on the event the task belongs to by clicking on the url below:<br>"
        + "<a href='" + Router.routes.EventEdit.url({_id: task.event}) + "'>" + Router.routes.EventEdit.url({_id: task.event}) + "</a><br><br>"
        + "The " + Accounts.emailTemplates.siteName + " Team"
    });
};
