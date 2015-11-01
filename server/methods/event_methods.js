/**
 * Created by Sergio on 10/3/2015.
 */
Meteor.methods({
    eventInsert: function (eventAttributes, tasksAttributes) {
        var event = _.extend(eventAttributes, {
            owner: Meteor.userId(),
            status: "active"
        });
        var eventId = events.insert(event);
        var newTasks = [];
        for (var i = 0; i < tasksAttributes.length; i++) {
            newTasks.push(
                tasks.insert(
                    _.extend(tasksAttributes[i], {
                        event: eventId
                    })
                )
            );
        }
        if (newTasks.length > 0) {
            events.update(eventId, {$set: {"tasks": newTasks}}, function (error) {
                if (error) {
                    throw error;
                }
            });
        }
    },
    eventUpdate: function (eventId, eventAttributes, tasksAttributes) {
        var event = eventAttributes;
        var newTasks = [];
        for (var i = 0; i < tasksAttributes.length; i++) {
            var task = tasksAttributes[i];
            if(!task.event) { //check if task is new since it won't have an event attached
                task.event = eventId;
            }
            var result = tasks.upsert(task._id, {$set: task}); //update or insert
            if (result.numberAffected > 0 && result.insertedId) { //check if new task inserted
                newTasks.push(result.insertedId);
            } else { // use _id since task was updated
                newTasks.push(task._id);
            }
        }
        if (newTasks.length > 0) {
            event = _.extend(eventAttributes, {
                tasks: newTasks
            });
        }
        events.update(eventId, {$set: event}, function (error) {
            if (error) {
                return error;
            }
        });
    },
    venueInsert: function (venue) {
        venues.insert(venue);
    },
    vendorInsert: function (vendor) {
        vendors.insert(vendor);
    }
});