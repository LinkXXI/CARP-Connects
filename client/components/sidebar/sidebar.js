Template.sidebar.events({
    'click #logout': function(){
        Meteor.logout(function(err) {
            if (err) {
                console.log(err);
                sAlert.error(GENERIC_UNEXPECTED_ERROR);
            } else {
                sAlert.info(LOGOUT);
            }
        });
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
    isAdmin: function(){
        return checkPermissions("");
    }
});

Template.sidebar.rendered = function() {
    $(".button-collapse").sideNav();
};