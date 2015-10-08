Router.route('/', {
    name: 'Index',
    template: 'index',
    waitOn: function () {
        return [
            Meteor.subscribe("Events"),
            Meteor.subscribe("Venues")
        ]
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

Router.route('/event/create', {
    name: "CreateEvent",
    template: "createEvent",
    waitOn: function () {
        return [
            Meteor.subscribe("Events"),
            Meteor.subscribe("Venues")
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

Router.route('/reports/task', {
    name: "TaskReport",
    template: "taskReport",
    waitOn: function(){
        return [
            Meteor.subscribe("Events")
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