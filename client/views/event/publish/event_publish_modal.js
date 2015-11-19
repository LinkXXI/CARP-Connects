Template.eventPublishModal.events({
    "click #eventpublish-yes": function () {
        var event = this;
        var hasCompletedTasks = !!tasks.find({event: event._id, status: "Complete"}).count();
        //if (!checkPermissions(PUBLISH_EVENT, {event: event})) {
        //    sAlert.error(EVENT_PUBLISH_NO_PERMISSION_ERROR);
        //} else
        if (hasCompletedTasks) {
            sAlert.error(EVENT_PUBLISH_INCOMPLETE_TASKS_ERROR);
        } else {
            Meteor.call('eventPublish', event, function (err) {
                if (err) {
                    sAlert.error(GENERIC_UNEXPECTED_ERROR);
                }
                else {
                    sAlert.success(EVENT_PUBLISH_SUCCESS);
                }
            });
        }
    }
});