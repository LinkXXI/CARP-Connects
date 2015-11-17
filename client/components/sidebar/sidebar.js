Template.sidebar.events({
    'click #logout': function(){
        Meteor.logout();
        sAlert.info(LOGOUT);
    }
});

Template.sidebar.helpers({
    isActive: function(routeName){
        if(Router.current().route.getName() === routeName){
            return "active href-disabled";
        }else{
            return "";
        }
    },
    isAdmin: function(routeName){
        return Meteor.user().profile.permissions.role === 'Administrator';
    }
});

Template.sidebar.rendered = function() {
    $(".button-collapse").sideNav();
};