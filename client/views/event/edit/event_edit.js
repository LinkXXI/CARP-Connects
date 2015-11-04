/**
 * Created by Sergio on 10/3/2015.
 */
Template.eventEdit.onRendered(function () {
    $('#datetime').datetimepicker();

/*    $('#event-budget').ionRangeSlider({
        type: "single",
        min: 0,
        max: 5000,
        grid: true,
        prefix: "$",
        step: 25
    });*/

    $("#event-budget").change(function () {
        $("#budget-total").html($("#event-budget").val());
    });

    $('.tooltipped').tooltip({delay: 50});
});

Template.eventEdit.onDestroyed(function () {
    Session.set('tasks', undefined);
    delete Session.keys['tasks'];
});

Template.eventEdit.helpers({
    "eventTheme": function () {
        return Enumeration.eventThemes;
    },
    "venues": function() {
        return venues.find({}, {sort: {name: 1}});
    },
    "tasks": function() {
        return Session.get('tasks');
    }
});

Template.eventEdit.events({
    "click #add-venue-button": function (e) {
        $('#add-venue-modal').openModal();
    },
    "click #cancel-add-venue-button": function (e) {
        var modal = $('#add-venue-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "click #add-task-button": function (e) {
        // reset so the vendor input box doesn't display
        Session.set('isVendorTask', false);
        $('#add-task-modal').openModal();
    },
    "click #cancel-add-task-button": function (e) {
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "submit #edit-event-form": function (e) {
        e.preventDefault();
        var eventId = this._id;
        var tasks = Session.get('tasks') != undefined ? Session.get('tasks') : tasks.find({}, {sort: {name: 1}}).fetch();
        var dateTime = $(e.target).find('#datetime').val();
        var event = {
            name: $(e.target).find('#event-name').val(),
            dateTime: formatDateDefault(dateTime),
            description: $(e.target).find('#description').val(),
            totalBudget: $(e.target).find('#event-budget').val(),
            theme: $(e.target).find('#theme option:selected').val(),
            venue: $(e.target).find('#venue').val()
        };
        Meteor.call('eventUpdate', eventId, event, tasks, function (error) {
            // display the error to the user and abort
            if (error) {
                sAlert.error(EVENT_EDIT_ERROR);
                return throwError(error.reason);
            }
            else {
                sAlert.success(EVENT_EDIT_SUCCESS);
            }
            // show this result but route anyway
            Router.go('EventView', {_id: eventId});
        });
    }
});




