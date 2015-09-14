/**
 * Created by darkl on 9/14/2015.
 */
Template.master.helpers({
    isLoginPage: function () {
        return Router.current().route.getName() === "Login";
    }
});