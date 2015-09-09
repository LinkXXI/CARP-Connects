Meteor.publish("Events", function(){
   return events.find({});
});