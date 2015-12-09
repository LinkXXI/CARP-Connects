Meteor.publish("Events", function () {
    return events.find({});
});

Meteor.publish("PastEvents", function () {
    return events.find({ status: "Complete" }, {sort: {name: 1}});
});

Meteor.publish("CurrentEvents", function () {
    return events.find({ status: "Active" }, {sort: {name: 1}});
});

Meteor.publish("Tasks", function () {
    return tasks.find();
});

Meteor.publish("TasksByEvent", function (eventId) {
    return tasks.find({event: eventId}, {sort: {name: 1}});
});

Meteor.publish("TasksByEventUser", function (eventId, userId) {
    return tasks.find({event: eventId, userIdAssignedTo: userId}, {sort: {name: 1}});
});

Meteor.publish("OneTask", function (taskId) {
    return tasks.find({_id: taskId});
});

Meteor.publish("Vendors", function () {
    return vendors.find({});
});

Meteor.publish("Venues", function () {
    return venues.find({});
});

Meteor.publish("Invitations", function () {
    return invitations.find();
});

Meteor.publish("AllUsers", function () {
    return Meteor.users.find({mergedWith: {$exists: false}});
});
Meteor.publish("OneUser", function (userId) {
    //TODO: meteor add audit-argument-checks
    //check(userId, String);
    return Meteor.users.find({_id: userId});
});

Meteor.publish("OneEvent", function (eventId) {
    //TODO: meteor add audit-argument-checks
    //check(eventId, String);
    return events.find({_id: eventId});
});

Meteor.publish("Themes", function () {
    return themes.find();
});

Meteor.publish("Messages", function (userId) {
    return messages.find({ $or: [ {toSingleUser: userId}, {from: userId} ] });
});

Meteor.publish("OneMessage", function (messageId) {
    return messages.find({_id: messageId});
});

Meteor.publish("PhoneTypes", function () {
    return phonetypes.find({}, {sort: {name: 1}});
});

Meteor.publish("Configuration", function () {
    return configuration.find();
});