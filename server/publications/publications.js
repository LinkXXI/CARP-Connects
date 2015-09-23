Meteor.publish("Events", function () {
    return events.find({});
});

Meteor.publish("Invitations", function(){
    console.log('doing stuff......');

   return invitations.find();
});

Meteor.publish("AllUsers", function(){
   return Meteor.users.find();
});
