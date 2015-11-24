/**
 * Created by Sergio on 10/3/2015.
 */
Meteor.methods({
    eventInsert: function (eventAttributes, tasksAttributes) {
        //if (checkPermissions(CREATE_EVENT)) {
        //TODO: check permission using same logic as security.js
        var event = _.extend(eventAttributes, {
            owner: Meteor.userId(),
            status: "Active"
        });
        var eventId = events.insert(event);
        for (var i = 0; i < tasksAttributes.length; i++) {
            tasks.insert(
                _.extend(tasksAttributes[i], {
                    event: eventId
                })
            );
        }
        // }
    },
    eventUpdate: function (eventId, eventAttributes, tasksAttributes) {
        // if (checkPermissions(EDT_EVENT, {event: eventAttributes, tasks: tasksAttributes})) {
        events.update(eventId, {$set: eventAttributes}, function (error) {
            if (error) {
                return error;
            }
        });
        for (var i = 0; i < tasksAttributes.length; i++) {
            var task = tasksAttributes[i];
            if (!task.event) { //check if task is new since it won't have an event attached
                task.event = eventId;
            }
            var result = tasks.upsert(task._id, {$set: task}); //update or insert
            if (result.numberAffected <= 0) { //check if task inserted
                //TODO: throw error when task isn't saved properly, make sure other tasks save as well
            }
        }
        // }
    },
    eventPublish: function (event) {
        // var hasIncompleteTasks = !!tasks.find({event: event._id, status: {$ne:"Complete"}}).count();
        //   if (!hasIncompleteTasks && checkPermissions(PUBLISH_EVENT, {event: event})) {
        events.update(event._id, {$set: {status: "Complete"}}, function (error) {
            if (error) {
                return error;
            }
        });
        // }
    },
    tasksDelete: function (taskIds) {
        //TODO: check permission using same logic as security.js
        for (var i = 0; i < taskIds.length; i++) {
            var taskId = taskIds[i];
            var result = tasks.remove(
                {_id: taskId}
            );
        }
    },
    venueInsert: function (venue) {
        //TODO: check permission using same logic as security.js
        venues.insert(venue);
    },
    venueDelete: function (venueId) {
        var count = events.find({
            venue: venueId
        }).count();
        if (count === 0) {
            venues.remove(
                {_id: venueId}
            );
            return true;
        }
        else {
            return false;
        }
    },
    vendorInsert: function (vendor) {
        //TODO: check permission using same logic as security.js
        vendors.insert(vendor);
    },
    vendorDelete: function (vendorId) {
        var count = tasks.find({
            vendor: vendorId
        }).count();
        if (count === 0) {
            vendors.remove(
                {_id: vendorId}
            );
            return true;
        }
        else {
            return false;
        }
    }
})
;
