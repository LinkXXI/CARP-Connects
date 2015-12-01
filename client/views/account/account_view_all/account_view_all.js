Template.accountViewAll.events({
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

Template.accountViewAll.helpers({
    tableSettings: function () {
        var route = "";
        var name = "";
        return {
            rowsPerPage: 10,
            filters: ['filterStatus'],
            fields: [
                {
                    key: '_id',
                    label: '',
                    fn: function (value) {
                        route = Router.routes.AccountView.path({_id: value});
                        return '';
                    },
                    sortable: false,
                    hidden: false
                },
                {
                    key: 'profile.firstName',
                    label: '',
                    fn: function (value) {
                        name = value;
                        return '';
                    },
                    sortable: false,
                    hidden: false
                },
                {
                    key: 'profile.lastName',
                    label: '',
                    fn: function (value) {
                        name += " " + value;
                        return '';
                    },
                    sortable: false,
                    hidden: false
                },
                {
                    key: '',
                    label: 'Name',
                    fn: function (value) {
                        return new Spacebars.SafeString('<a href="' + route + '" ' +
                            'class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="View user">' +
                            name + '</a>');
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