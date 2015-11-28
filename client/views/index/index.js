/**
 * Created by darkl on 9/9/2015.
 */
Template.index.helpers({
    "calendarEvents": function () {
        return this.fetch();
    },
    assignedTasks: function () {
        // search for incomplete events
        var incompleteEvents = events.find({status: {$ne: "Complete"}}).fetch();
        var incompleteEventsIds = [];
        for (var i = 0; i < incompleteEvents.length; i++) {
            incompleteEventsIds.push(incompleteEvents[i]._id);
        }
        // only get tasks for incomplete events
        return tasks.find({
            userIdAssignedTo: Meteor.userId(),
            event: {$in: incompleteEventsIds}
        }, {sort: {dateTime: 1}}).fetch();
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