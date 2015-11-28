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