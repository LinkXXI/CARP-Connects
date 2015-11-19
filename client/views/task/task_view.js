/**
 * Created by Sergio on 11/18/2015.
 */
Template.taskView.helpers({
    'isVendorTask': function () {
        return this.taskType === "Vendor";
    },
    'hasNotes': function () {
        return this.notes !== "";
    },
    'userIdAssignedTo': function () {
        return Meteor.users.findOne({_id: this.userIdAssignedTo});
    },
    'vendor': function () {
        return vendors.findOne({_id: this.vendor});
    },
    'isActiveEvent': function () {
        var event = events.find().fetch();
        return event.status === "active";
    }}
);