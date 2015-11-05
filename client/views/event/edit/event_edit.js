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

var allTasks;

Template.eventEdit.helpers({
    'eventTheme': function () {
        return Enumeration.eventThemes;
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
        var dbTasks = tasks.find().fetch();
        var sessionTasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();
        var originalTasks = new Array();
        var mergedlTasks = new Array();
        // pass unique db task objects to the new merged array.  if the _id matches any session task objects, dont add it
        $.each(dbTasks, function(i, dbTask) {
            var isDupe = false;
            $.each(sessionTasks, function(j, sessionTask) {
               if (dbTask._id === sessionTask._id) {
                    isDupe = true;
               }
            });
            if (!isDupe) {
                // we only want to push tasks that don't have a matching id in session Tasks
                originalTasks.push(dbTask);
            }
        });
        // this copies the originalTasks array to mergedTasks...
        mergedTasks = originalTasks.slice();
        // combine the merged task array and the session task array, should now have all unique and updated tasks
        for (var i = 0; i < sessionTasks.length; i++) {
            //console.log("session task: + i);");
            //console.log(sessionTasks[i]);
            mergedTasks.push(sessionTasks[i]);
        }
        // allTasks is passed to the eventUpdate server method call
        allTasks = mergedTasks;
        return originalTasks;
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
        var tasks = allTasks;
        var dateTime = $(e.target).find('#datetime').val();
        var event = {
            name: $(e.target).find('#event-name').val(),
            dateTime: formatDateDefault(dateTime),
            description: $(e.target).find('#description').val(),
            totalBudget: $(e.target).find('#event-budget').val(),
            theme: $(e.target).find('#theme option:selected').val(),
            venue: $(e.target).find('#venue').val()
        };
        Meteor.call('eventUpdate', eventId, event, allTasks, function (error) {
            // display the error to the user and abort
            if (error) {
                sAlert.error(EVENT_EDIT_ERROR);
                return throwError(error.reason);
            }
            else {
                Session.set('tasks', undefined);
                delete Session.keys['tasks'];
                sAlert.success(EVENT_EDIT_SUCCESS);
            }
            // show this result but route anyway
            Router.go('EventView', {_id: eventId});
        });
    }
});




