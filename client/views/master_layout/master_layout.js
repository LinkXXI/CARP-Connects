/**
 * Created by darkl on 9/14/2015.
 */
Template.master.helpers({
    hideHeader: function () {
        isRouteToBeHidden();
    },
    wrapperClass:function(){
        /*if(isRouteToBeHidden()){
         return "class='container'"
        }else{
            return "class='container container-offset'";
        }*/
    }
});

var isRouteToBeHidden = function (){
    return Router.current().route.getName() === "Login" ||
        Router.current().route.getName() === "Incomplete";
};