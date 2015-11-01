Template.eventView.rendered = function () {
/*    //store the dateTime from the input box in a var
    var dateTime = $('#datetime').val();
    //set the datepicker to use the stored dateTime, otherwise it'll default to current date
    $('#datetime').datetimepicker({
        value: dateTime,
        format:'D/M/YYYY h:mm a'
    });*/

    $('.tooltipped').tooltip({delay: 50});
};

Template.eventView.helpers({
    "eventTheme": function () {
        return Enumeration.eventThemes;
    },
    "tasks": function () {
        return tasks.find().fetch();
    },
    venue: function () {
        return venues.findOne({_id: this.venue});
    },
    "venues": function() {
        return venues.find({}, {sort: {name: 1}});
},
    "vendors": function() {
        return vendors.find({}, {sort: {name: 1}});
    }
});

Template.eventView.events({
    "click #add-venue-button": function (e) {
        $('#add-venue-modal').openModal();
    },
    "click #cancel-add-venue-button": function (e) {
        var modal = $('#add-venue-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    },
    "click #add-task-button": function (e) {
        // reset so the vendor input box doesn't display
        Session.set('isVendorTask', false);
        $('#add-task-modal').openModal();
    },
    "click #cancel-add-task-button": function (e) {
        var modal = $('#add-task-modal');
        modal.closeModal();
        modal.find('form')[0].reset();
    }
});