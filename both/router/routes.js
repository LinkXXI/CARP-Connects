Router.route('/', {
    name: 'Index',
    template: 'index',
    waitOn: function () {
        Meteor.subscribe("Events")
    }
});

Router.route('/login', {
    name: "Login",
    template: "login",
    waitOn: function () {
        return [];
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