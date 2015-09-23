/**
 * Created by darkl on 9/14/2015.
 */
Template.master.helpers({
    hideHeader: function () {
        isRouteToBeHidden();
    },
    wrapperClass:function(){
        return isRouteToBeHidden() ? "container":"offset-container";
    }
});

var isRouteToBeHidden = function (){
    return Router.current().route.getName() === "Login" ||
        Router.current().route.getName() === "Incomplete";
};