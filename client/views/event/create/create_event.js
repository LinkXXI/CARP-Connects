/**
 * Created by Sergio on 10/3/2015.
 */
Template.createEvent.events({
    "submit #create-event-form": function (e) {
        e.preventDefault();
        var event = {
            name: $(e.target).find('#event-name').val(),
            dateTime: $(e.target).find('#date').val(),
            description: $(e.target).find('#description').val(),
            totalBudget: $(e.target).find('#event-budget').val(),
            theme: $(e.target).find('#theme').val(),
            status: $(e.target).find('#status').val(),
            venue: $(e.target).find('#venue').val()
        };
        Meteor.call('eventInsert', event, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);
            // show this result but route anyway
            Router.go('/');
        });
    }
});