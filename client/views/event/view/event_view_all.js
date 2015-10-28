/**
 * Created by Sergio on 10/27/2015.
 */
Template.eventViewAll.rendered = function () {
    $('.tooltipped').tooltip({delay: 50});
};

Template.eventViewAll.helpers({
    allEvents: function () {
        return events.find({});
    },
    tableSettings: function () {
        return {
            rowsPerPage: 10,
            filters: ['filterStatus'],
            fields: [
                {
                    key: '_id',
                    label: '',
                    fn: function (value) {
                        route = Router.routes.EventView.path({_id: value});
                        return new Spacebars.SafeString('<a href="'
                            + route +
                            '" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="View event details">' +
                            '<i class="mdi-content-forward small"></i></a>');
                    },
                    sortable: false
                },
                {
                    key: 'name',
                    label: 'Event Name'
                },
                {
                    key: 'dateTime',
                    label: 'Date',
                    fn: function (date) {
                        // this is a call to a global function in /both/lib/global_functions.js
                        return formatDateShort(date);
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
                {
                    key: 'status',
                    label: 'Status'
                }
            ]
        };
    }
});