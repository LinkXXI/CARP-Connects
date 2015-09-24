/**
 * Created by Benjamin on 9/21/2015.
 */
Template.reports.helpers({
});

Template.reports.onRendered(function() {
    $('select').material_select();
    $('#reports').on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });
});