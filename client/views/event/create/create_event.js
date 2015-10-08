/**
 * Created by Sergio on 10/3/2015.
 */
Template.createEvent.rendered = function () {
    $('#datetime').datetimepicker();

    $('#event-budget').ionRangeSlider({
        type: "single",
        min: 0,
        max: 5000,
        grid: true,
        prefix: "$",
        step: 25
    });

    $("#event-budget").change(function () {
        $("#budget-total").html($("#event-budget").val());
    });

    $('.tooltipped').tooltip({delay: 50});
};

Template.createEvent.helpers({
    "eventTheme": function () {
        return Enumeration.eventThemes;
    },
    "isOptionSelected": function (option, value) {
        if (option === value) {
            return 'selected';
        } else {
            return ''
        }
    },
    "venues": function() {
        return venues.find({}, {sort: {name: 1}});
    },
    "tasks": function () {
        return Session.get('tasks');
    }
});

Template.createEvent.events({
    "click #add-venue-button": function (e) {
        $('#add-venue-modal').openModal();
    },
    "click #cancel-add-venue-button": function (e) {
        var modal = $('#add-venue-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "click #add-task-button": function (e) {
        $('#add-task-modal').openModal();
    },
    "click #cancel-add-task-button": function (e) {
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "submit #create-event-form": function (e) {
        e.preventDefault();
        var tasks = Session.get('tasks') != undefined ? Session.get('tasks'): new Array();
        delete Session.keys['foo'];
        var event = {
            name: $(e.target).find('#event-name').val(),
            dateTime: $(e.target).find('#datetime').val(),
            description: $(e.target).find('#description').val(),
            totalBudget: $(e.target).find('#event-budget').val(),
            theme: $(e.target).find('#theme option:selected').text(),
            venue: $(e.target).find('#venue').val(),
            tasks: tasks
        };
        Meteor.call('eventInsert', event, function (error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);
            // show this result but route anyway
            Router.go('/');
        });
    }
});




