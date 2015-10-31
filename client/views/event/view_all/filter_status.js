/**
 * Created by Sergio on 10/27/2015.
 */
Template.filterStatus.rendered = function () {
    // needed to active tool tips after reactive table re-initializes
    $('.tooltipped').tooltip({delay: 50});
};

Template.filterStatus.created = function() {
    this.filter = new ReactiveTable.Filter('filterStatus', ['status']);
};

Template.filterStatus.events({
    'change input' : function(event, template) {
        var radioText = $('input[name="filterStatus"]:checked').val();
        //console.log(radioText);
        if(radioText != 'all'){
            template.filter.set(radioText);
        } else {
            template.filter.set("");
        }
        // needed to active tool tips after reactive table re-initializes
        Meteor.setTimeout(function() {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    }
});