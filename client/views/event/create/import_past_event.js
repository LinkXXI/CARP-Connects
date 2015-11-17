/**
 * Created by Sergio on 11/16/2015.
 */
Template.importPastEventModal.events({
    "click #cancel-import-past-event-button": function (e) {
        var modal = $('#import-past-event-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "submit #import-past-event-form": function (e) {
        e.preventDefault();
        pastEventId = $(e.target).find('#past-event option:selected').val();
        Session.set('pastEventId', pastEventId);
        var modal = $('#import-past-event-modal');
        modal.closeModal();
        modal.find('form')[0].reset();

        //re-init tooltip for Edit & Delete task buttona, they are added to dom dynamically...
        Meteor.setTimeout(function() {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    }
});

Template.importPastEventModal.helpers({
    'pastEvents': function () {
        return events.find();
    }
});