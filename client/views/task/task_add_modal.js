/**
 * Created by Sergio on 10/8/2015.
 */
Template.taskEditModal.onRendered(function () {
    $('#task-datetime').datetimepicker();
});

Template.taskAddModal.events({
    'click #cancel-add-task-button': function (e) {
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    'submit #add-task-form': function (e) {
        e.preventDefault();
        var dateTime = $(e.target).find('#task-datetime').val();
        var task = {
            _id: Random.id(),
            name: $(e.target).find('#task-name').val(),
            dateTime: formatDateDefault(dateTime),
            description: $(e.target).find('#task-description').val(),
            taskType: $(e.target).find('#task-type option:selected').val(),
            vendor: $(e.target).find('#vendor-name').val(),
            budget: $(e.target).find('#task-budget').val(),
            userIdAssignedTo: $(e.target).find('#task-assigned-to').val(),
            status: $(e.target).find('#task-status option:selected').val()
        };
        var tasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();
        tasks.push(task);
        Session.set('tasks', tasks);
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();

        sAlert.success(TASK_CREATED_SUCCESS);
    },
    'change #task-type': function (e) {
        var isVendorTask = $(e.target).find('option:selected').val() === 'Vendor';
        Session.set('isVendorTask', isVendorTask);
        //re-init tooltip for Add Vendor button
        Meteor.setTimeout(function() {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    },
    "click #add-vendor-button": function (e) {
        $('#add-vendor-modal').openModal();
    }
});

Template.taskAddModal.helpers({
    'taskStatus': function () {
        return Enumeration.taskStatus;
    },
    'taskType': function () {
        return Enumeration.taskTypes;
    },
    'users': function () {
        return Meteor.users.find({}, {sort: {name: 1}});
    },
    'isVendorTask': function () {
        return Session.get('isVendorTask');
    },
    "vendors": function() {
        return vendors.find({}, {sort: {name: 1}});
    }
});