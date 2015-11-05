/**
 * Created by Sergio on 10/8/2015.
 */
Template.taskCard.onRendered(function () {
    if (Router.current().route.getName() === 'EventEdit') {
        $('.task-link').addClass('pointer');
    }
});

Template.taskCard.helpers({
    getStatus: function () {
        var color = "light blue";
        if (this.status === "Not Started") {
            color = "red lighten-4";
        }
        else if (this.status === "In Progress") {
            color = "orange lighten-4";
        }
        else if (this.status === "Complete") {
            color = "green lighten-4";
        }
        return color;
    },
    isCurrentRoute: function (routeName) {
        if (Router.current().route.getName() === routeName) {
            return true;
        } else {
            return false;
        }
    },
    'isVendorTask': function () {
        return this.taskType === "Vendor";
    },
    userIdAssignedTo: function () {
        return Meteor.users.findOne({_id: this.userIdAssignedTo});
    },
    vendor: function () {
        return vendors.findOne({_id: this.vendor});
    }
});

Template.taskCard.events({
    'click .edit-task-button': function (e) {
        Session.set('taskToEditById', undefined);
        Session.set('taskToEditById', this._id);
        $('#edit-task-modal').openModal();
    },
    'click .task-link': function (e) {
        if (Router.current().route.getName() === 'EventEdit') {
            Session.set('taskToEditById', undefined);
            Session.set('taskToEditById', this._id);
            $('#edit-task-modal').openModal();
        }
    }
});