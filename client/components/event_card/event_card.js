Template.eventCard.onRendered(function () {
    $('.tooltipped').tooltip({delay: 50});
});

Template.eventCard.helpers({
    venue: function () {
        return venues.findOne({_id: this.venue});
    },
    isActiveEvent: function () {
        return this.status === "Active";
    }
});