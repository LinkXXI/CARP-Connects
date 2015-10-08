Router.route('/', {
    name: 'Index',
    template: 'index',
    waitOn: function () {
        Meteor.subscribe("Events")
    },
    data: function() {
        return events.find();
    }
});

Router.route('/login', {
    name: "Login",
    template: "login",
    waitOn: function () {
        return [];
    }
});

Router.route('/account', {
    name: "Account",
    template: "accountView",
    data: function() {
        return Meteor.user();
    }
});

Router.route('/account/edit', {
    name: "AccountEdit",
    template: "accountEdit",
    data: function() {
        return Meteor.user();
    }
});

Router.route('/account/:userId', {
    name: "AccountById",
    template: "accountView",
    waitOn: function() {
        return Meteor.subscribe('OneUser', this.params.userId);
    },
    data: function() {
        return Meteor.users.findOne({_id:this.params.userId});
    }
});

Router.route('/event/:_id', {
    name: "EventView",
    template: "eventView",
    waitOn: function() {
        return Meteor.subscribe('OneEvent', this.params._id);
    },
    data: function() {
        return events.findOne({_id:this.params._id});
    }
});
Router.route('/event/:_id/work', {
    name: "EventWork",
    template: "eventWork",
    waitOn: function() {
        return Meteor.subscribe('OneEvent', this.params._id);
    },
    data: function() {
        return events.findOne({_id:this.params._id});
    }
});
Router.route('/event/:_id/publish', {
    name: "EventPublish",
    template: "eventPublish",
    waitOn: function() {
        return Meteor.subscribe('OneEvent', this.params._id);
    },
    data: function() {
        return events.findOne({_id:this.params._id});
    }
});

Router.route('/event/create', {
    name: "CreateEvent",
    template: "createEvent",
    waitOn: function () {
        return [
            Meteor.subscribe("Events"),
            Meteor.subscribe("Addresses")
        ]
    }
});

Router.route('/reports', {
    name: "Reports",
    template: "reports"
});

Router.route('/reports/invite', {
    name: "InviteReport",
    template: "inviteReport",
    waitOn: function(){
        return [
            Meteor.subscribe("Invitations")
        ]
    }
});

Router.route('/incomplete', {
    name: "Incomplete",
    template: "incomplete",
    waitOn: function(){
        return [];
    },
    data: function(){
        return Meteor.user();
    }
});

Router.route('accountLocked', {
    name:"AccountLocked",
    template:"accountLocked"
});

Router.route('/invitations', {
    name:"Invitations",
    template:"invitations",
    waitOn: function(){
        return [
            Meteor.subscribe("Invitations"),
            Meteor.subscribe("AllUsers")
        ]
    },
    data: function(){
        invitations.find();
    }
});

Router.route('/users', {
    name: "UserManagement",
    template: "userManagement",
    waitOn:function(){
        return [
               Meteor.subscribe("AllUsers")
            ]
    }
});