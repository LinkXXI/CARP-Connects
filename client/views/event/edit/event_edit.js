/**
 * Created by Sergio on 10/3/2015.
 */
Template.eventEdit.onRendered(function () {
    $('#datetime').datetimepicker({});

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
    Session.set('taskToEditById', undefined);
    delete Session.keys['taskToEditById'];
    Session.set('tasksToDelete', undefined);
    delete Session.keys['tasksToDelete'];
    Session.set('venueId', undefined);
    delete Session.keys['venueId'];
});

var allTasks;

Template.eventEdit.helpers({
    'eventOwner': function () {
        return Meteor.users.findOne({_id: this.owner});
    },
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
        var dbTasks = tasks.find().fetch();
        var tasksToDelete = Session.get('tasksToDelete') != undefined ? Session.get('tasksToDelete') : new Array();
        // this returns an array of tasks in the db minus tasks in Session tasksToDelete
        var updatedDbTasks = $.grep(dbTasks, function (obj) {
            var isADeleteMatch = true;
            $.each(tasksToDelete, function(i, task) {
                if (task === obj._id) {
                    // the task id matches an item in the tasksToDelete array, so we don't return the Task in the new dbTasks array
                    isADeleteMatch = false;
                }
            });
            return isADeleteMatch;
        });

        var sessionTasks = Session.get('tasks') != undefined ? Session.get('tasks') : new Array();
        var notInSessionTasks = new Array();
        var mergedTasks = new Array();
        // pass unique db task objects to the new merged array.  if the _id matches any session task objects, dont add it
        $.each(updatedDbTasks, function(i, dbTask) {
            var isDupe = false;
            $.each(sessionTasks, function(j, sessionTask) {
               if (dbTask._id === sessionTask._id) {
                    isDupe = true;
               }
            });
            if (!isDupe) {
                // we only want to push tasks that don't have a matching id in session Tasks
                notInSessionTasks.push(dbTask);
            }
        });
        // this copies the originalTasks array to mergedTasks...
        mergedTasks = notInSessionTasks.slice();
        // combine the merged task array and the session task array, should now have all unique and updated tasks
        for (var i = 0; i < sessionTasks.length; i++) {
            //console.log("session task: + i);");
            //console.log(sessionTasks[i]);
            mergedTasks.push(sessionTasks[i]);
        }
        // allTasks is passed to the eventUpdate server method call
        allTasks = mergedTasks;

        // this returns notInSessionTasks because we only want to display db tasks, not all
        return notInSessionTasks;
    }
});

Template.eventEdit.events({
    'click #add-venue-button': function (e) {
        $('#add-venue-modal').openModal();
    },
    'click #cancel-add-venue-button': function (e) {
        var modal = $('#add-venue-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    'click #add-task-button': function (e) {
        // reset so the vendor input box doesn't display
        Session.set('isVendorTask', false);
        $('#add-task-modal').openModal();
    },
    'click #cancel-add-task-button': function (e) {
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    'submit #edit-event-form': function (e) {
        e.preventDefault();
        // iterate through tasksToDelete array and delete tasks from collection
        var tasksToDelete = Session.get('tasksToDelete') != undefined ? Session.get('tasksToDelete') : new Array();
        Meteor.call('tasksDelete', tasksToDelete, function (error) {
            // display the error to the user and abort
            if (error) {
                return throwError(error.reason);
            }
        });

        // now we can insert the tasks
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
    },
    'change #venue': function(e) {
        var venueId = $('#venue option:selected').val();
        Session.set('venueId', venueId);
    }
});




