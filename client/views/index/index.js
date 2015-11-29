/**
 * Created by darkl on 9/9/2015.
 */
Template.index.helpers({
    "calendarEvents": function () {
        return this.fetch();
    }
});

Template.assignedTasksCollection.helpers({
    assignedTasks: function () {
        // only get tasks for incomplete events
        return tasks.find({
            userIdAssignedTo: Meteor.userId(),
            event: {$in: getIncompleteEventsIds()}
        }, {sort: {dateTime: 1}}).fetch();
    },
    newTasks: function() {
        // check if user has any new (not started) assigned tasks for incomplete events
        return tasks.find({
            userIdAssignedTo: Meteor.userId(),
            event: {$in: getIncompleteEventsIds()},
            status: "Not Started"
        }, {sort: {dateTime: 1}}).count();
    },
    getStatus: function () {
        var color = "light blue";
        if (this.status === "Not Started") {
            color = "red lighten-4";
        }
        else if (this.status === "In Progress") {
            color = "orange lighten-4";
        }
        else if (this.status === "Complete") {
            color = "green lighten-4";
        }
        return color;
    },
    eventName: function (eventId) {
        return events.findOne({_id: eventId}).name;
    }
});

var getIncompleteEventsIds = function() {
    // search for incomplete events
    var incompleteEvents = events.find({status: {$ne: "Complete"}}).fetch();
    var incompleteEventsIds = [];
    for (var i = 0; i < incompleteEvents.length; i++) {
        incompleteEventsIds.push(incompleteEvents[i]._id);
    }
    return incompleteEventsIds;
};