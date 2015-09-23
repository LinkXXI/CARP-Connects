/**
 * Created by darkl on 9/14/2015.
 */
Template.master.helpers({
    hideHeader: function () {
        return Router.current().route.getName() === "Login" ||
            Router.current().route.getName() === "Incomplete";
    },
    wrapperClass:function(){
        if(Router.current().route.getName() === "Login" ||
            Router.current().route.getName() === "Incomplete"){
            return "";
        }else{
            return "offset-container";
        }
    }
});

var isRouteToBeHidden = function (){
    return Router.current().route.getName() === "Login" ||
        Router.current().route.getName() === "Incomplete";
};