/**
 * Created by Sergio on 10/27/2015.
 */
Template.eventViewAll.events({
    // needed to active tool tips after reactive table re-initializes
    'change .form-control': function () {
        Meteor.setTimeout(function () {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    },
    'click table': function () {
        Meteor.setTimeout(function () {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    },
    'click .reactive-table-navigation': function () {
        Meteor.setTimeout(function () {
            $('.tooltipped').tooltip({delay: 50})
        }, 200);
    }
});

Template.eventViewAll.helpers({
    allEvents: function () {
        return events.find({});
    },
    tableSettings: function () {
        route = "";
        return {
            rowsPerPage: 10,
            filters: ['filterStatus'],
            fields: [
                {
                    key: '_id',
                    label: '',
                    fn: function (value) {
                        route = Router.routes.EventView.path({_id: value});
                        //parentRow = $('.' + value)();
                        //console.log(parentRow);
                        //console.log(parentRow[0].id);
                        //console.log(parentRow[0].nodeName);
/*                        return new Spacebars.SafeString('<a href="'
                            + route +
                            '" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="View event details">' +
                            '<i class="mdi-content-forward small"></i></a>');*/
                        return '';
                    },
                    sortable: false,
                    hidden: false
                },
                {
                    key: 'name',
                    label: 'Event Name',
                    fn: function (value) {
                        return new Spacebars.SafeString('<a href="' + route + '" ' +
                            'class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="View event details">' +
                            value + '</a>');
                    }
                },
                {
                    key: 'dateTime',
                    label: 'Date',
                    fn: function (date) {
                        // this is a call to a global function in /both/lib/global_functions.js
                        return formatDateTable(date);
                    }
                },
                {
                    key: 'totalBudget',
                    label: 'Budget',
                    fn: function (amount) {
                        // this is a call to a global function in /both/lib/global_functions.js
                        return formatCurrency(amount);
                    }
                },
                /*                {
                 key: 'owner',
                 label: 'Owner',
                 fn: function (value) {
                 route = Router.routes.AccountById.path({userId: value});
                 return new Spacebars.SafeString('<a href="' + route + '">' + value + '</a>');
                 }
                 },*/
                {
                    key: 'description',
                    label: 'Description'
                },
                /*                {
                 key: 'theme',
                 label: 'Theme'
                 },*/
/*                {
                    key: 'status',
                    label: 'Status',
                    fn: function (value) {
                        return value.charAt(0).toUpperCase() + value.slice(1);
                    }
                }*/
            ]
        };
    }
});