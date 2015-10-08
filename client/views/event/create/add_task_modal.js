/**
 * Created by Sergio on 10/8/2015.
 */
Template.addTaskModal.rendered = function () {
    $('#task-datetime').datetimepicker();

    $('#task-budget').ionRangeSlider({
        type: "single",
        min: 0,
        max: 750,
        grid: true,
        prefix: "$",
        step: 10
    });
};

Template.addTaskModal.events({
    "click #cancel-add-task-button": function (e) {
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
        //$(this)[0].reset();
    },
    "submit #add-task-form": function (e) {
        e.preventDefault();
        var task = {
            name: $(e.target).find('#task-name').val(),
            dateTime: $(e.target).find('#task-datetime').val(),
            description: $(e.target).find('#task-description').val(),
            budget: $(e.target).find('#task-budget').val(),
            userIdAssignedTo: $(e.target).find('#task-assigned-to').val(),
            status: $(e.target).find('#task-status option:selected').text()
        };
        var tasks = Session.get('tasks') != undefined ? Session.get('tasks'): new Array();
        tasks.push(task);
        Session.set('tasks', tasks);
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
        //$(this)[0].reset();
    }
});

Template.addTaskModal.helpers({
    "taskStatus": function () {
        return Enumeration.taskStatus;
    },
    "users": function () {
        return Meteor.users.find({}, {sort: {name: 1}});
    }
});