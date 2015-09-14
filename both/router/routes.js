Router.route('/',{
    name: 'Index',
    template: 'index',
    waitOn:function(){
        Meteor.subscribe("Events")
    }
});

Router.route('/login', {
    name: "Login",
    template: "login",
    waitOn:function(){
        return [];
    }
});