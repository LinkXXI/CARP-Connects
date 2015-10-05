/**
 * Created by Sergio on 10/3/2015.
 */
Meteor.methods({
    eventInsert: function (eventAttributes) {
        var user = Meteor.user();
        var event = _.extend(eventAttributes, {
            owner: user._id,
            isComplete: false
        });
        return events.insert(event);
    },
    addressInsert: function (address) {
        return addresses.insert(address);
    },
    venueInsert: function (venue) {
        venues.insert(venue);
    }
});