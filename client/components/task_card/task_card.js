/**
 * Created by Sergio on 10/8/2015.
 */
Template.taskCard.onRendered(function () {
    if (Router.current().route.getName() === 'EventEdit' || Router.current().route.getName() === 'EventView') {
        $('.task-link').addClass('cursor-pointer');
    }
    else {
        $('.task-link').addClass('cursor-default');
    }

    $('.tooltipped').tooltip({delay: 50});
});

Template.taskCard.helpers({
    'getStatus': function () {
        var color = "light blue";
        if (this.status === "Not Started") {
            color = "red lighten-4";
        }
        else if (this.status === "In Progress") {
            color = "orange lighten-4";
        }
        else if (this.status === "Complete") {
            color = "green lighten-4";
        }
        return color;
    },
    viewTaskLink: function () {
        if (Router.current().route.getName() === "EventView") {
            return {
                href: Router.routes.TaskView.path({_id: this._id})
            };
        }
    },
    'isEditable': function () {
        if (Router.current().route.getName() === 'EventEdit' || Session.get('pastEventId') != undefined) {
            return true;
        } else {
            return false;
        }
    },
    'isVendorTask': function () {
        return this.taskType === "Vendor";
    },
    'hasNotes': function () {
        return this.notes !== "";
    },
    'userIdAssignedTo': function () {
        return Meteor.users.findOne({_id: this.userIdAssignedTo});
    },
    'vendor': function () {
        return vendors.findOne({_id: this.vendor});
    }
});

Template.taskCard.events({
    'click .edit-task-button': function (e) {
        if (this.taskType === "Vendor") {
            Session.set('isVendorTaskEdit', true);
        } else {
            Session.set('isVendorTaskEdit', undefined);
        }
        Session.set('taskToEditById', this._id);
        //console.log(this._id);
        $('#edit-task-modal').openModal();
    },
    'click .delete-task-button': function (e) {
        var id = this._id;
        new Confirmation({
            message: "Are you sure you want to delete this task?",
            title: "Delete Task",
            cancelText: "Cancel",
            okText: "Yes",
            success: false // true is green, false is red
        }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if (ok) {
                // delete the item from Session first
                var tasksToDelete = Session.get('tasksToDelete') != undefined ? Session.get('tasksToDelete') : new Array();
                var pastSessionTasks = Session.get('pastTasks') != undefined ? Session.get('pastTasks') : new Array();
                var sessionTasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();

                var isSessionTask = false;
                // first, lets delete any tasks marked for deletion in Session
                var updatedPastSessionTasks = $.grep(pastSessionTasks, function (obj) {
                    var isSessionTask = false;
                    // find and removes matches in new/updated tasks
                    var returnVal = obj._id !== id;
                    if (!returnVal) {
                        isSessionTask = true;
                    }
                    return returnVal;
                });
                var updatedSessionTasks = $.grep(sessionTasks, function (obj) {
                    var isSessionTask = false;
                    // find and removes matches in new/updated tasks
                    var returnVal = obj._id !== id;
                    if (!returnVal) {
                        isSessionTask = true;
                    }
                    return returnVal;
                });

                // update the Session with the updated task arrays
                Session.set('pastTasks', updatedPastSessionTasks);
                Session.set('tasks', updatedSessionTasks);
                if (!isSessionTask) {
                    // push the id into the tasksToDelete array if its not in there already
                    if ($.inArray(id, tasksToDelete) == -1) {
                        // the task id here is the one to be deleted where the Task is not in the Session tasks
                        tasksToDelete.push(id);
                    }
                }
                Session.set('tasksToDelete', tasksToDelete);

                // isolate the task card row
                var taskCardRow = e.target.parentNode.parentNode.parentNode.parentNode;
                // hide the task card until form submitted - where delete happens
                $(taskCardRow).hide();
                // popup message to user
                sAlert.success(TASK_DELETED_SUCCESS);
            }
        });
    },
    'click .help-task-button': function (e) {
        var taskId = this._id;

        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});
        var userFirstName = user.profile.firstName === "" ? "" : user.profile.firstName;
        var userLastName = user.profile.lastName === "" ? "" : user.profile.lastName;

        var eventOwnerId = events.findOne({_id: this.event}).owner;
        var eventOwner = Meteor.users.findOne({_id: eventOwnerId});
        var eventOwnerFirstName = eventOwner.profile.firstName === "" ? "" : eventOwner.profile.firstName;
        var eventOwnerLastName = eventOwner.profile.lastName === "" ? "" : eventOwner.profile.lastName;
        //console.log(userId);
        new Confirmation({
            message: "The event owner is " + eventOwnerFirstName + " " + eventOwnerLastName +
            ". Do you wish to send them a help request message?",
            title: "Request Help from Event Owner",
            cancelText: "Cancel",
            okText: "Yes",
            success: false // true is green, false is red
        }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if (ok) {
                var createdAt = new Date();
                var outgoingMessage = {
                    type: "Outgoing",
                    subject: "Task help request from " + userFirstName + " " + userLastName,
                    body: "Task help request from " + userFirstName + " " + userLastName,
                    read: true,
                    from: userId,
                    to: eventOwnerId,
                    createdAt: createdAt,
                    linkedTask: taskId
                };
                var incomingMessage = {
                    type: "Incoming",
                    subject: "Help request from " + userFirstName + " " + userLastName,
                    body: "Help request from " + userFirstName + " " + userLastName,
                    read: false,
                    from: userId,
                    to: eventOwnerId,
                    createdAt: createdAt,
                    linkedTask: taskId
                };
                Meteor.call('messageInsert', outgoingMessage, incomingMessage, function (error) {
                    // display the error to the user and abort
                    if (error) {
                        sAlert.error(TASK_HELP_REQUEST_ERROR);
                        return throwError(error.reason);
                    }
                    else {
                        sAlert.success(TASK_HELP_REQUEST_SUCCESS);
                        //TODO: send email
                    }
                });
            }
        });
    },
    'click .task-link': function (e) {
        if (Router.current().route.getName() === 'EventEdit') {
            if (this.taskType === "Vendor") {
                Session.set('isVendorTaskEdit', true);
            } else {
                Session.set('isVendorTaskEdit', undefined);
            }
            Session.set('taskToEditById', undefined);
            Session.set('taskToEditById', this._id);
            $('#edit-task-modal').openModal();
        }
    }
});