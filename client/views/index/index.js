/**
 * Created by darkl on 9/9/2015.
 */
Template.index.helpers({
    events: function(){
        console.log(events.find().count());
        return events.find().fetch();
    }
});