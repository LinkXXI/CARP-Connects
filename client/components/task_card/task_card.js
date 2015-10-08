/**
 * Created by Sergio on 10/8/2015.
 */
Template.taskCard.helpers({
    getStatus: function () {
        var color = "light blue";
        if (this.status == "Not Started") {
            color = "red lighten-4";
        }
        else if (this.status == "In Progress") {
            color = "orange lighten-4";
        }
        else if (this.status == "Complete") {
            color = "green lighten-4";
        }
        return color;
    }
});