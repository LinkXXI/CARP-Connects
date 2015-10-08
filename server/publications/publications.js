Meteor.publish("Events", function () {
    return events.find({});
});

Meteor.publish("Venues", function () {
    return venues.find({});
});

Meteor.publish("Invitations", function(){
   return invitations.find();
});

Meteor.publish("AllUsers", function(){
   return Meteor.users.find();
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
