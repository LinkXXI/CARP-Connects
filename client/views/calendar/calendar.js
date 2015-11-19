/**
 * Created by Benjamin on 10/7/2015.
 */
/*
Tracker.autorun(function(){
    var eventsFetched = events.find().fetch();
    if (eventsFetched) {
        Session.set("eventsFetched", eventsFetched)
    }
});
*/

function mapCalendarEvents(eventsArr) {
    var calendarEvents = [];
    if (eventsArr) {
        $.each(eventsArr, function (i, event) {
            var eventTasks = tasks.find({event: event._id}).fetch();
            calendarEvents.push({
                title: event.name,
                start: event.dateTime,
                url: Router.routes.EventView.path({_id: event._id}),
                color: "#99CCFF",
                allDay: false
            });
            if (eventTasks.length > 0) {
                $.each(eventTasks, function (j, task) {
                    calendarEvents.push({
                        title: task.name,
                        start: task.dateTime,
                        url: Router.routes.TaskView.path({_id: task._id}),
                        color: "#99CC99",
                        allDay: false
                    });
                });
            }

        });
    }
    return calendarEvents;
}

Template.calendar.helpers({
    options: function () {
        return {
            id: "calendar",
            events: mapCalendarEvents(this)
        };
    }
});
