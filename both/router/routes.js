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

Router.route('/accountmanagement', {
    name: "AccountManagement",
    template: "accountManagement"
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