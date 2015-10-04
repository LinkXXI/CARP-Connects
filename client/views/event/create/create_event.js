/**
 * Created by Sergio on 10/3/2015.
 */
Template.createEvent.rendered = function () {
    $('select').material_select();

    $('#datetimepicker').datetimepicker();

    $('#event-budget').ionRangeSlider({
        type: "single",
        min: 0,
        max: 5000,
        grid: true
    });

    $("#event-budget").change(function () {
        $("#budget-total").html($("#event-budget").val());
    });
};

Template.createEvent.helpers({
    "eventTheme": function () {
        return Enumeration.eventThemes;
    },
    "isEventThemeSelected": function (option, value) {
        if (option === value) {
            return 'selected';
        } else {
            return ''
        }
    }
});

Template.createEvent.events({
    "submit #create-event-form": function (e) {
        e.preventDefault();
        var event = {
            name: $(e.target).find('#event-name').val(),
            dateTime: $(e.target).find('#datetimepicker').val(),
            description: $(e.target).find('#description').val(),
            totalBudget: $(e.target).find('#event-budget').val(),
            theme: $(e.target).find('#theme').val(),
            venue: $(e.target).find('#venue').val()
        };
        Meteor.call('eventInsert', event, function (error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);
            // show this result but route anyway
            Router.go('/');
        });
    }
});


