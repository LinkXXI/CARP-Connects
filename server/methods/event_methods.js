/**
 * Created by Sergio on 10/3/2015.
 */
Meteor.methods({
    eventInsert: function (eventAttributes) {
        var user = Meteor.user();
        var event = _.extend(eventAttributes, {
            owner: user._id,
            status: "active"
        });
        return events.insert(event);
    },
    eventUpdate: function (eventId, eventAttributes) {
        events.update(eventId, {$set: eventAttributes}, function(error) {
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