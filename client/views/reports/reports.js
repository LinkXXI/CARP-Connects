/**
 * Created by Benjamin on 9/21/2015.
 */
Template.reports.events({
    'change #reports': function (e) {
        var url = $(e.target).find('option:selected').val();
        if (url) {
            Router.go(url);
        }
        return false;
    }
});