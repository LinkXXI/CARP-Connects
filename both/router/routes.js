Router.route('/', {
    name: 'Index',
    template: 'index',
    waitOn: function () {
        return [
            Meteor.subscribe('Events'),
            Meteor.subscribe('Tasks'),
            Meteor.subscribe('Venues')
        ]
    },
    data: function () {
        return events.find({}, {sort: {dateTime: 1}});
    }
});

Router.route('/login', {
    name: 'Login',
    template: 'login',
    waitOn: function () {
        return [];
    }
});

Router.route('/login/:token/forgot', {
    name: 'ForgotPassword',
    template: 'login',
    waitOn: function () {
        return [];
    },
    data: function () {
        return {token: this.params.token};
    }
});

Router.route('/accounts/:_id/edit', {
    name: 'AccountEdit',
    template: 'accountEdit',
    waitOn: function () {
        return Meteor.subscribe('OneUser', this.params._id);
    },
    data: function () {
        return Meteor.users.findOne({_id: this.params._id});
    }
});

Router.route('/accounts/:_id', {
    name: 'AccountView',
    template: 'accountView',
    waitOn: function () {
        return Meteor.subscribe('OneUser', this.params._id);
    },
    data: function () {
       return Meteor.users.findOne({_id: this.params._id});
    }
});

Router.route('/calendar', {
    name: 'Calendar',
    template: 'calendar',
    waitOn: function () {
        return [
            Meteor.subscribe('Events'),
            Meteor.subscribe('Tasks')
        ];
    },
    data: function () {
        return events.find().fetch();
    }
});

Router.route('/tasks/:_id', {
    name: 'TaskView',
    template: 'taskView',
    waitOn: function () {
        return [
            Meteor.subscribe('OneTask', this.params._id),
            Meteor.subscribe('OneEvent', this.event),
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('Vendors'),
            Meteor.subscribe('Venues')
        ];
    },
    data: function () {
        return tasks.findOne({_id: this.params._id});
    }
});

Router.route('/events', {
    name: 'Events',
    template: 'eventViewAll',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('Events')
        ];
    },
    data: function () {
        return events.find();
    }
});

Router.route('/events/create', {
    name: 'EventCreate',
    template: 'eventCreate',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('PastEvents'),
            Meteor.subscribe('Tasks'),
            Meteor.subscribe('Vendors'),
            Meteor.subscribe('Venues'),
            Meteor.subscribe('Themes')
        ]
    }
});

Router.route('/events/:_id/edit', {
    name: 'EventEdit',
    template: 'eventEdit',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('OneEvent', this.params._id),
            Meteor.subscribe('TasksByEvent', this.params._id),
            Meteor.subscribe('Vendors'),
            Meteor.subscribe('Venues'),
            Meteor.subscribe('Themes')
        ];
    },
    data: function () {
        return events.findOne({_id: this.params._id});
    }
});

Router.route('/events/:_id/publish', {
    name: 'EventPublish',
    template: 'eventView',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('OneEvent', this.params._id),
            Meteor.subscribe('TasksByEvent', this.params._id),
            Meteor.subscribe('Venues'),
            Meteor.subscribe('Vendors'),
            Meteor.subscribe('Themes')
        ];
    },
    data: function () {
        return events.findOne({_id: this.params._id});
    }
});

Router.route('/events/:_id', {
    name: 'EventView',
    template: 'eventView',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('OneEvent', this.params._id),
            Meteor.subscribe('TasksByEvent', this.params._id),
            Meteor.subscribe('Venues'),
            Meteor.subscribe('Vendors'),
            Meteor.subscribe('Themes')
        ];
    },
    data: function () {
        return events.findOne({_id: this.params._id});
    }
});

Router.route('/reports', {
    name: 'Reports',
    template: 'reports',
    waitOn: function () {
        return [
            Meteor.subscribe('Events')
        ]
    }
});

Router.route('/reports/invite', {
    name: 'InviteReport',
    template: 'inviteReport',
    waitOn: function () {
        return [
            Meteor.subscribe('Invitations')
        ]
    }
});

Router.route('/reports/event_stats', {
    name: 'EventStatsReport',
    template: 'eventStatsReport',
    waitOn: function () {
        return [
            Meteor.subscribe('Events'),
            Meteor.subscribe('Tasks')
        ]
    }
});

// the id being passed below is an event id
Router.route('/reports/tasks_by_event/:_id', {
    name: 'TaskReport',
    template: 'taskReport',
    waitOn: function () {
        return [
            Meteor.subscribe('OneEvent', this.params._id),
            Meteor.subscribe('TasksByEvent', this.params._id)
        ]
    },
    data: function () {
        return events.findOne({_id: this.params._id});
    }
});

Router.route('/incomplete', {
    name: 'Incomplete',
    template: 'incomplete',
    waitOn: function () {
        return [];
    },
    data: function () {
        return Meteor.user();
    }
});

Router.route('accountLocked', {
    name: 'AccountLocked',
    template: 'accountLocked'
});

Router.route('/invitations', {
    name: 'Invitations',
    template: 'invitations',
    waitOn: function () {
        return [
            Meteor.subscribe('Invitations'),
            Meteor.subscribe('AllUsers')
        ]
    },
    data: function () {
        return invitations.find();
    }
});

Router.route('/applyInvite/:_id', {
    name: 'ApplyInvitation',
    template: 'applyInvite',
    data: function () {
        return {_id:this.params._id};
    }
});

Router.route('/users', {
    name: 'UserManagement',
    template: 'userManagement',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers')
        ]
    }
});

Router.route('/config', {
    name: 'Configuration',
    template: 'configuration',
    waitOn: function () {
        return [
            Meteor.subscribe('Vendors'),
            Meteor.subscribe('Venues'),
            Meteor.subscribe('Themes')
        ]
    }
});

Router.route('/dw', {
    name: 'DocumentWorkspace',
    template: 'documentWorkspace',
    waitOn: function () {
        return [
            Meteor.subscribe('Vendors'),
            Meteor.subscribe('Venues')
        ]
    }
});

Router.route('/messages', {
    name: 'Messages',
    template: 'messages',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('Tasks')
        ]
    }
});

Router.route('/messages/create', {
    name: 'MessageCreate',
    template: 'messageCreate',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers')
        ]
    }
});

Router.route('/messages/view/:_id', {
    name: 'MessageView',
    template: 'messageView',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('OneMessage', this.params._id)
        ]
    },
    data: function () {
        return messages.findOne({_id: this.params._id});
    }
});

Router.route('/messages/reply/:_id', {
    name: 'MessageReply',
    template: 'messageReply',
    waitOn: function () {
        return [
            Meteor.subscribe('AllUsers'),
            Meteor.subscribe('OneMessage', this.params._id)
        ]
    },
    data: function () {
        return messages.findOne({_id: this.params._id});
    }
});