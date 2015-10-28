/**
 * Created by Sergio on 10/27/2015.
 */
Template.filterStatus.created = function() {
    this.filter = new ReactiveTable.Filter('filterStatus', ['status']);
};

Template.filterStatus.events({
    "change" : function(event, template) {
        var radioText = $('input:checked').next().text().toLowerCase();
        //console.log(radioText);
        if(radioText != 'all'){
            template.filter.set(radioText);
        } else {
            template.filter.set("");
        }
    }
});