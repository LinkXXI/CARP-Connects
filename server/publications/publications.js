Meteor.publish("Events", function () {
    return events.find({});
});

Meteor.publish("Invitations", function(){
   return invitations.find();
});

Meteor.publish("AllUsers", function(){
   return Meteor.users.find();
});
