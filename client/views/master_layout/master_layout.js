/**
 * Created by darkl on 9/14/2015.
 */
Template.master.helpers({
    loggedIn: function () {
        return !(Router.current().route.getName() === "Login" ||
        Router.current().route.getName() === "Incomplete" ||
        Router.current().route.getName() === "AccountLocked" ||
        !Meteor.user());
    }
});