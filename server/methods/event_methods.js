/**
 * Created by Sergio on 10/3/2015.
 */
Meteor.methods({
    eventInsert: function (eventAttributes, tasksAttributes) {
        //if (checkPermissions(CREATE_EVENT)) {
        //TODO: check permission using same logic as security.js
        var event = _.extend(eventAttributes, {
            owner: Meteor.userId(),
            status: "Active"
        });
        var eventId = events.insert(event);
        for (var i = 0; i < tasksAttributes.length; i++) {
            var task = tasksAttributes[i];
            tasks.insert(
                _.extend(task, {
                    event: eventId
                })
            );
            // check if send email when task created config option is set
            var taskCreateEmailConfig = configuration.findOne({name: 'config-task-create-email'});
            if (taskCreateEmailConfig.value) {
                // send email to assignee informaing them of their new task
                sendTaskCreateEmail(task);
            }
        }
        // }
    },
    eventUpdate: function (eventId, eventAttributes, tasksAttributes) {
        // if (checkPermissions(EDT_EVENT, {event: eventAttributes, tasks: tasksAttributes})) {
        events.update(eventId, {$set: eventAttributes}, function (error) {
            if (error) {
                return error;
            }
        });
        for (var i = 0; i < tasksAttributes.length; i++) {
            var task = tasksAttributes[i];
            if (!task.event) { //check if task is new since it won't have an event attached
                task.event = eventId;
            }
            // find the task in the tasks Collection
            var result = tasks.findOne({_id: task._id});
            if (result) {
                // check if the userIdAssignedTo matches
                if (result.userIdAssignedTo !== task.userIdAssignedTo) {
                    // if not then send a new task notification to the new user
                    var taskCreateEmailConfig = configuration.findOne({name: 'config-task-create-email'});
                    if (taskCreateEmailConfig.value) {
                        // send email to assignee informing them of their new task
                        sendTaskCreateEmail(task);
                    }
                }
                // update the task
                tasks.update(task._id, {$set: task}, function (error) {
                    if (error) {
                        return error;
                    }
                });
            }
            else {
                // if we couldnt find the task, insert it
                result = tasks.insert(task);
                if (result.numberAffected > 0) { //check if task inserted
                    // check if send email when task created config option is set
                    var taskCreateEmailConfig = configuration.findOne({name: 'config-task-create-email'});
                    if (taskCreateEmailConfig.value) {
                        // send email to assignee informaing them of their new task
                        sendTaskCreateEmail(task);
                    }
                } else {
                    //TODO: throw error when task isn't saved properly, make sure other tasks save as well
                }
            }
        }
    },
    eventPublish: function (event) {
        // var hasIncompleteTasks = !!tasks.find({event: event._id, status: {$ne:"Complete"}}).count();
        //   if (!hasIncompleteTasks && checkPermissions(PUBLISH_EVENT, {event: event})) {
        events.update(event._id, {$set: {status: "Complete"}}, function (error) {
            if (error) {
                return error;
            }
        });
        // }
    },
    tasksDelete: function (taskIds) {
        //TODO: check permission using same logic as security.js
        for (var i = 0; i < taskIds.length; i++) {
            var taskId = taskIds[i];
            var result = tasks.remove(
                {_id: taskId}
            );
        }
    },
    themeInsert: function (theme) {
        //TODO: check permission using same logic as security.js
        themes.insert(theme);
    },
    themeDelete: function (themeId) {
        var count = events.find({
            theme: themeId
        }).count();
        if (count === 0) {
            themes.remove(
                {_id: themeId}
            );
            return true;
        }
        else {
            return false;
        }
    },
    venueInsert: function (venue) {
        //TODO: check permission using same logic as security.js
        venues.insert(venue);
    },
    venueDelete: function (venueId) {
        var count = events.find({
            venue: venueId
        }).count();
        if (count === 0) {
            venues.remove(
                {_id: venueId}
            );
            return true;
        }
        else {
            return false;
        }
    },
    vendorInsert: function (vendor) {
        //TODO: check permission using same logic as security.js
        vendors.insert(vendor);
    },
    vendorDelete: function (vendorId) {
        var count = tasks.find({
            vendor: vendorId
        }).count();
        if (count === 0) {
            vendors.remove(
                {_id: vendorId}
            );
            return true;
        }
        else {
            return false;
        }
    }
});

var sendTaskCreateEmail = function (task) {
        var to = Meteor.users.findOne({_id: task.userIdAssignedTo});
        var email = to.emails[0].address;
        Email.send({
                to: email,
                from: Accounts.emailTemplates.from,
                subject: "You have been assigned to the task " + task.name,
                html: "Hello " + to.profile.firstName + " " + to.profile.lastName + ",<br><br>"
                + "You have been assigned to a task.<br>"
                + "The due date set been set as " + formatDateShort(task.dateTime) + "<br><br>"
                + "You can work on the task by clicking on the url below:<br>"
                + "<a href='" + Router.routes.TaskView.url({_id: task._id}) + "'>" + Router.routes.TaskView.url({_id: task._id}) + "</a><br><br>"
                + "The " + Accounts.emailTemplates.siteName + " Team"
            }
        )
        ;
    }
    ;