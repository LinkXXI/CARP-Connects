/**
 * Created by Benjamin on 10/7/2015.
 */
Template.calendar.onCreated(function () {
    this.autorun(function () { // update calendar when changes made after initial load (this allows the calendar to be reactive)
        var allEvents = events.find().fetch();
        var calendar = $('#calendar');
        calendar.fullCalendar('removeEvents');
        calendar.fullCalendar('addEventSource', mapCalendarEvents(allEvents));
    });
});

Template.calendar.onRendered(function () {
    // add legend button to fullcalendar and initialize
    $('.fc-right').append('<a href="#!" id="calendarLegend" class="btn-flat dropdown-button no-margin-bot" data-activates="legend">Legend<i class="mdi-navigation-arrow-drop-down right"></i></a>');
    $('#calendarLegend').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
});

function mapCalendarEvents(eventsArr) {
    var calendarEvents = [];
    if (eventsArr) {
        $.each(eventsArr, function (i, event) {
            var eventTasks = tasks.find({event: event._id}).fetch();
            calendarEvents.push({
                title: event.name,
                start: event.dateTime,
                url: Router.routes.EventView.path({_id: event._id}),
                color: event.status == "Complete" ? "#99CCFF" : "#9C27B0",
                allDay: false
            });
            if (eventTasks.length > 0) {
                $.each(eventTasks, function (j, task) {
                    if (event.status != "Complete") {
                        calendarEvents.push({
                            title: task.name,
                            start: task.dateTime,
                            url: Router.routes.TaskView.path({_id: task._id}),
                            color: task.userIdAssignedTo == Meteor.userId() ? "#EF4444" : "#99CC99",
                            allDay: false
                        });
                    }
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
