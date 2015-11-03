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
        for (var i = 0; i < tasksAttributes.length; i++) {
            tasks.insert(
                _.extend(tasksAttributes[i], {
                    event: eventId
                })
            );
        }
    },
    eventUpdate: function (eventId, eventAttributes, tasksAttributes) {
        events.update(eventId, {$set: eventAttributes}, function (error) {
            if (error) {
                return error;
            }
        });
        for (var i = 0; i < tasksAttributes.length; i++) {
            var task = tasksAttributes[i];
            if(!task.event) { //check if task is new since it won't have an event attached
                task.event = eventId;
            }
            var result = tasks.upsert(task._id, {$set: task}); //update or insert
            if (result.numberAffected <= 0) { //check if new task inserted
                //TODO: throw error when task isn't saved properly, make sure other tasks save as well
            }
        }
    },
    venueInsert: function (venue) {
        venues.insert(venue);
    },
    vendorInsert: function (vendor) {
        vendors.insert(vendor);
    }
});