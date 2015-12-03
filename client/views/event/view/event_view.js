Template.eventView.onRendered(function() {
    /*    //store the dateTime from the input box in a var
     var dateTime = $('#datetime').val();
     //set the datepicker to use the stored dateTime, otherwise it'll default to current date
     $('#datetime').datetimepicker({
     value: dateTime,
     format:'D/M/YYYY h:mm a'
     });*/
    $('.tooltipped').tooltip({delay: 50});
    
    if (Router.current().route.getName() === "EventPublish") {
        this.$('#eventpublish-modal').openModal();
    }

    var budget = $("#event-budget").text();
    Session.set("eventBudget", budget);
});

Template.eventView.helpers({
    'eventOwner': function () {
        return Meteor.users.findOne({_id: this.owner});
    },
    'theme': function () {
        return themes.findOne({_id: this.theme});
    },
    'tasks': function () {
        return tasks.find().fetch();
    },
    'venue': function () {
        return venues.findOne({_id: this.venue});
    },
    'venues': function () {
        return venues.find({}, {sort: {name: 1}});
    },
    'vendors': function () {
        return vendors.find({}, {sort: {name: 1}});
    },
    'isActiveEvent': function () {
        return this.status === "Active";
    },
    'eventStatus': function () {
        return this.status === "Complete" ? "Published Event" : "Incomplete Event";
    },
    'budgetTasks': function () {
        var eventTasks = tasks.find({event: this._id}).fetch();
        var tasksBudget = 0;
        $.each(eventTasks, function (j, task) {
            tasksBudget += parseFloat(task.budget);
        });
        tasksBudget = parseFloat(tasksBudget).toFixed(2);

        Session.set("tasksBudget", tasksBudget);

        return tasksBudget;
    },
    'budgetTotal': function () {
        var eventBudget = Session.get("eventBudget") || "0";
        eventBudget = parseFloat(eventBudget).toFixed(2);
        return eventBudget;
    },
    'budgetStatusColor': function () {
        var color = "";
        var eventBudget = parseFloat(Session.get("eventBudget") == undefined ? 0 : Session.get("eventBudget"));
        var tasksBudget = parseFloat(Session.get("tasksBudget") == undefined ? 0 : Session.get("tasksBudget"));
        if (tasksBudget == eventBudget) {
            color = "green";
        } else if (tasksBudget < eventBudget) {
            color = "green";
        } else {
            color = "red";
        }
        return color;
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
    },
    "click .publish-event-button": function (e, template) {
        $('#eventpublish-modal').openModal();
    }
});