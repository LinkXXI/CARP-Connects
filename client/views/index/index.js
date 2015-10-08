/**
 * Created by darkl on 9/9/2015.
 */
Template.index.rendered = function() {
    console.log(events.find());
    $("#calendar").fullCalendar('addEventSource', events.find().fetch());
};
Template.index.helpers({

});