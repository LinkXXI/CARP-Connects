/**
 * Created by Sergio on 10/8/2015.
 */
Template.addTaskModal.rendered = function () {
    $('#task-datetime').datetimepicker();

/*    $('#task-budget').ionRangeSlider({
        type: "single",
        min: 0,
        max: 750,
        grid: true,
        prefix: "$",
        step: 10
    });*/
};

Template.addTaskModal.events({
    'click #cancel-add-task-button': function (e) {
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    'submit #add-task-form': function (e) {
        e.preventDefault();
        var dateTime = $(e.target).find('#task-datetime').val();
        var task = {
            name: $(e.target).find('#task-name').val(),
            dateTime: formatDateDefault(dateTime),
            description: $(e.target).find('#task-description').val(),
            taskType: $(e.target).find('#task-type option:selected').text(),
            vendor: $(e.target).find('#vendor-name').val(),
            budget: $(e.target).find('#task-budget').val(),
            userIdAssignedTo: $(e.target).find('#task-assigned-to').val(),
            status: $(e.target).find('#task-status option:selected').text()
        };
        var tasks = Session.get('tasks') != undefined ? Session.get('tasks'): new Array();
        tasks.push(task);
        Session.set('tasks', tasks);
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    'change #task-type': function (e) {
        var isVendorTask = $(e.target).find('option:selected').val() === 'vendor';
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

Template.addTaskModal.helpers({
    'taskStatus': function () {
        return Enumeration.taskStatus;
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