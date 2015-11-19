/**
 * Created by Benjamin on 9/21/2015.
 */
Template.reports.onRendered(function () {
    $('#event').hide();
});

Template.reports.helpers({
    'events': function() {
        return events.find();
    }
});

Template.reports.events({
    'change #reports': function (e) {
        var reportType = $(e.target).find('option:selected').val();
        switch (reportType) {
            case "task":
                $('#event').show();
                break;
            case "eventStats":
                $('#event').hide();
                Router.go(Router.routes.EventStatsReport.path());
                break;
            case "financial":
                $('#event').hide();
                Router.go(Router.routes.FinancialReport.path());
                break;
            case "invitation":
                $('#event').hide();
                Router.go(Router.routes.InviteReport.path());
                break;
        }
        return false;
    },
    'change #events': function (e) {
        var eventId = $(e.target).find('option:selected').val();
        Router.go(Router.routes.TaskReport.path({_id: eventId}));
    }
});