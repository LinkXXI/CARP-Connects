Template.sidebar.events({
    'click #logout': function(){
        Meteor.logout();
    }
});

Template.sidebar.helpers({
    isActive: function(routeName){
        if(Router.current().route.getName() === routeName){
            return "active href-disabled";
        }else{
            return "";
        }
    }
});

Template.sidebar.rendered = function() {
    $(".button-collapse").sideNav();
};