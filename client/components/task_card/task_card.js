/**
 * Created by Sergio on 10/8/2015.
 */
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
    }
});

Template.taskCard.events({
    'click .edit-task-button': function (e) {
        Session.set('taskToEdit', this._id);
        $('#edit-task-modal').openModal();
    },
    'click .task-link': function (e) {
        if (Router.current().route.getName() === 'EventEdit') {
            Session.set('taskToEdit', this._id);
            $('#edit-task-modal').openModal();
        } else if (Router.current().route.getName() === 'EventView') {
            // this will be changed to the view task modal later.
            Session.set('taskToEdit', this._id);
            $('#edit-task-modal').openModal();
        }
    }
});