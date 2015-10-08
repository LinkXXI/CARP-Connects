/**
 * Created by Sergio on 9/24/2015.
 */
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper('formatCurrency', function(amount) {
    return "$" + parseFloat(amount).toFixed(2);
});