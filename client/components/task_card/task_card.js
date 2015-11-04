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
    'click #edit-task-button': function (e) {
        Session.set('taskToEdit', this._id);
        $('#edit-task-modal').openModal();
    },
    'click #cancel-edit-task-button': function (e) {
        var modal = $('#edit-task-modal');
        modal.closeModal();
    }
});