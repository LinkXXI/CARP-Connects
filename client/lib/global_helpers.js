/**
 * Created by Sergio on 9/24/2015.
 */
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper('formatDateShort', function(date) {
    return moment(date).format('MMM Do YYYY, h:mm a');
});

Template.registerHelper('formatDateMDYT', function(date) {
    return moment(date).format('M/D/YYYY h:mm a');
});

Template.registerHelper('formatCurrency', function(amount) {
    return "$" + parseFloat(amount).toFixed(2);
});

Template.registerHelper('isOptionSelected', function(option, value) {
    if (option === value) {
        return {selected: true};
    } else {
        return "";
    }
});

Template.registerHelper('isOptionSelectedReadOnly', function(option, value) {
    if (option === value) {
        return {selected: true};
    } else {
        return {disabled: true};
    }
});

Template.registerHelper('hasValueMarkActive', function(value) {
    if (value) {
        return {class: "active"};
    }
});

