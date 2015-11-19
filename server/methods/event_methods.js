/**
 * Created by Sergio on 10/3/2015.
 */
Meteor.methods({
    eventInsert: function (eventAttributes, tasksAttributes) {
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
    },
    eventUpdate: function (eventId, eventAttributes, tasksAttributes) {
        //TODO: check permission using same logic as security.js
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
    },
    eventPublish: function (eventId) {
        //TODO: check permission using same logic as security.js
        events.update(eventId, {$set: {status: "complete"}}, function (error) {
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
    vendorInsert: function (vendor) {
        //TODO: check permission using same logic as security.js
        vendors.insert(vendor);
    }
});