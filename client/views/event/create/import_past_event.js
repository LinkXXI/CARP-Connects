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
    }
});

Template.importPastEventModal.helpers({
    'pastEvents': function () {
        return events.find();
    }
});