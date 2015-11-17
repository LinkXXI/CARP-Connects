/**
 * Created by Sergio on 11/3/2015.
 */
Template.taskEditModal.onRendered(function () {
    $('#edit-task-datetime').datetimepicker();

    var isVendorTask = $('#edit-task-type option:selected').val() === 'Vendor';
    Session.set('isVendorTaskEdit', isVendorTask);
    //re-init tooltip for Add Vendor button
    Meteor.setTimeout(function () {
        $('.tooltipped').tooltip({delay: 50})
    }, 200);
});

Template.taskEditModal.events({
    'click #cancel-edit-task-button': function (e) {
        var modal = $('#edit-task-modal');
        modal.closeModal();
    },
    'change #edit-task-type': function (e) {
        var isVendorTask = $(e.target).find('option:selected').val() === 'Vendor';
        Session.set('isVendorTaskEdit', isVendorTask);
        //re-init tooltip for Add Vendor button
        Meteor.setTimeout(function () {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    },
    'click #add-vendor-button': function (e) {
        $('#add-vendor-modal').openModal();
    },
    'submit #edit-task-form': function (e) {
        e.preventDefault();
        var dateTime = $(e.target).find('#edit-task-datetime').val();
        var id = $(e.target).find('#edit-task-id').val();
        var task = {
            _id: id,
            name: $(e.target).find('#edit-task-name').val(),
            dateTime: formatDateDefault(dateTime),
            description: $(e.target).find('#edit-task-description').val(),
            taskType: $(e.target).find('#edit-task-type option:selected').val(),
            vendor: $(e.target).find('#edit-vendor-name').val(),
            budget: $(e.target).find('#edit-task-budget').val(),
            userIdAssignedTo: $(e.target).find('#edit-task-assigned-to').val(),
            status: $(e.target).find('#edit-task-status option:selected').val()
        };
        var sessionTasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();
        // search session tasks for and remove task with the current _id
        var result = $.grep(sessionTasks, function (obj) {
            // found and removed old task
            return obj._id != id;
        });
        // update the session tasks with the updated task
        result.push(task);
        Session.set('tasks', result);

        var pastSessionTasks = Session.get('pastTasks') == undefined ? false : Session.get('pastTasks');
        // search pastSessionTasks for and remove task with the current _id
        result = $.grep(pastSessionTasks, function (obj) {
            // found and removed old task
            return obj._id != id;
        });
        // update the past session tasks
        Session.set('pastTasks', result);

        var modal = $('#edit-task-modal');
        modal.closeModal();

        sAlert.success(TASK_EDITED_SUCCESS);
    }
});

Template.taskEditModal.helpers({
    'taskStatus': function () {
        return Enumeration.taskStatus;
    },
    'taskType': function () {
        return Enumeration.taskTypes;
    },
    'users': function () {
        return Meteor.users.find();
    },
    'vendors': function () {
        return vendors.find({}, {sort: {name: 1}});
    },
    'task': function () {
        var id = Session.get('taskToEditById');
        //get the tasks from the session
        var sessionTasks = Session.get('tasks') == undefined ? false : Session.get('tasks');
        var pastSessionTasks = Session.get('pastTasks') == undefined ? false : Session.get('pastTasks');
        var task;
        // make sure there is an id to edit first
        if (id) {
            // look in Session tasks for new and updated tasks
            if (sessionTasks) {
                var result = $.grep(sessionTasks, function (e) {
                    return e._id == id;
                });
                task = result[0];
            }
            // also look in Past events (in case its an imported event)
            if (!task && pastSessionTasks) {
                var result = $.grep(pastSessionTasks, function (e) {
                    return e._id == id;
                });
                task = result[0];
            }
            // if theres no matching task in the Session, look in the db
            if (!task) {
                task = tasks.findOne({_id: id});
            }
        }
        return task;
    },
    'isVendorTask': function () {
        var isVendorTask = Session.get('isVendorTaskEdit');
        return isVendorTask;
    }
});