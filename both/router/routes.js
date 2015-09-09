Router.route('/',{
    name: 'Index',
    template: 'index',
    waitOn:function(){
        Meteor.subscribe("Events")
    }
});