/**
 * Created by Sergio on 10/3/2015.
 */
Template.eventCreate.onRendered(function () {
    $('#datetime').datetimepicker({});

//    $("#event-budget").change(function () {
//        $("#budget-total").html($("#event-budget").val());
//    });

    $('.tooltipped').tooltip({delay: 50});
});

Template.eventCreate.onDestroyed(function () {
    Session.set('tasks', undefined);
    delete Session.keys['tasks'];
    Session.set('taskToEditById', undefined);
    delete Session.keys['taskToEditById'];
    Session.set('pastTasks', undefined);
    delete Session.keys['pastTasks'];
    Session.set('pastEventId', undefined);
    delete Session.keys['pastEventId'];
    Session.set('tasksToDelete', undefined);
    delete Session.keys['tasksToDelete'];
    Session.set('venueId', undefined);
    delete Session.keys['venueId'];
});

Template.eventCreate.helpers({
    'themes': function () {
        return themes.find({}, {sort: {name: 1}});
    },
    'venues': function () {
        return venues.find({}, {sort: {name: 1}});
    },
    'hasNewTasks': function () {
        return Session.get('tasks');
    },
    'sessionTasks': function () {
        var sessionTasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();
        return sessionTasks;
    },
    'tasks': function () {
        return Session.get('pastTasks');
    },
    'pastEvent': function () {
        var pastEventId = Session.get('pastEventId');
        if (pastEventId) {
            var event = events.findOne({_id: pastEventId});
            // the event will get a new unique id when it's inserted into the Events collection
            delete event._id;
            var eventName = event['name'];
            event['name'] = eventName + " (Copy)";
            event['status'] = "Active";
            var eventTasks = tasks.find({event: pastEventId}, {sort: {name: 1}}).fetch();
            $.each(eventTasks, function(i, eventTask) {
                eventTask._id = Random.id();
                eventTask.event = pastEventId;
                eventTask.status = "Not Started";
            });
            Session.set('pastTasks', eventTasks);
            var venueId = event.venue;
            Session.set('venueId', venueId);
            return event;
        }
    },
    'activeLabel': function () {
        return Session.get('pastEventId') != undefined ? "active" : "";
    },
    'isVenueSelected': function () {
        return Session.get('venueId');
    }
});

Template.eventCreate.events({
    "click #import-past-event-button": function (e) {
        $('#import-past-event-modal').openModal();
    },
    "click #add-theme-button": function (e) {
        $('#add-theme-modal').openModal();
    },
    'click #add-venue-button': function (e) {
        $('#add-venue-modal').openModal();
    },
    "click #add-task-button": function (e) {
        // reset so the vendor input box doesn't display
        Session.set('isVendorTask', false);
        $('#add-task-modal').openModal();
    },
    "submit #create-event-form": function (e) {
        e.preventDefault();
        var pastSessionTasks = Session.get('pastTasks') != undefined ? Session.get('pastTasks') : new Array();
        var sessionTasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();

        // this copies the sessionTasks array to allTasks...
        var allTasks = sessionTasks.slice();

        if (pastSessionTasks) {
            // merge the past tasks with new tasks
            for (var i = 0; i < pastSessionTasks.length; i++) {
                allTasks.push(pastSessionTasks[i]);
            }
        }

        var dateTime = $(e.target).find('#datetime').val();
        var event = {
            name: $(e.target).find('#event-name').val(),
            dateTime: formatDateDefault(dateTime),
            description: $(e.target).find('#description').val(),
            totalBudget: $(e.target).find('#event-budget').val(),
            theme: $(e.target).find('#theme option:selected').val(),
            venue: $(e.target).find('#venue').val()
        };
        Meteor.call('eventInsert', event, allTasks, function (error) {
            // display the error to the user and abort
            if (error) {
                sAlert.error(EVENT_INSERT_ERROR);
                return throwError(error.reason);
            }
            else {
                sAlert.success(EVENT_INSERT_SUCCESS);
            }
            // show this result but route anyway
            Router.go('/');
        });
        // set the key to undefined first to make sure it's really gone
        Session.set('tasks', undefined);
        delete Session.keys['tasks'];
    },
    'change #venue': function(e) {
        var venueId = $('#venue option:selected').val();
        Session.set('venueId', venueId);
    }
});




