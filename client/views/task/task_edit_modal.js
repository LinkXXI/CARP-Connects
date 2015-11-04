/**
 * Created by Sergio on 11/3/2015.
 */
Template.taskEditModal.onRendered(function () {
    $('#edit-task-datetime').datetimepicker();
});

Template.taskEditModal.onCreated(function () {

});

Template.taskEditModal.events({
    'click #cancel-edit-task-button': function (e) {
        var modal = $('#edit-task-modal');
        modal.closeModal();
    },
    'change #task-type': function (e) {
        var isVendorTask = $(e.target).find('option:selected').val() === 'Vendor';
        Session.set('isVendorTaskEdit', isVendorTask);
        //re-init tooltip for Add Vendor button
        Meteor.setTimeout(function () {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    },
    "click #add-vendor-button": function (e) {
        $('#add-vendor-modal').openModal();
    },
    'submit #edit-task-form': function (e) {
        e.preventDefault();
        var dateTime = $(e.target).find('#edit-task-datetime').val();
        var task = {
            _id: $(e.target).find('#edit-task-id').val(),
            name: $(e.target).find('#edit-task-name').val(),
            dateTime: formatDateDefault(dateTime),
            description: $(e.target).find('#edit-task-description').val(),
            taskType: $(e.target).find('#edit-task-type option:selected').val(),
            vendor: $(e.target).find('#edit-vendor-name').val(),
            budget: $(e.target).find('#edit-task-budget').val(),
            userIdAssignedTo: $(e.target).find('#edit-task-assigned-to').val(),
            status: $(e.target).find('#edit-task-status option:selected').val()
        };

        var newTasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();
        newTasks.push(task);
        Session.set('tasks', newTasks);
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
        return Meteor.users.find({}, {sort: {name: 1}});
    },
    'vendors': function () {
        return vendors.find({}, {sort: {name: 1}});
    },
    task: function() {
        var id = Session.get('taskToEdit');
        if (id) {
            var task = tasks.findOne({_id: id});
        }
        return task;
    },
    isVendorTask: function () {
        return this.taskType === "Vendor";
    }
});