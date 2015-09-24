Template.accountLocked.helpers({
    isUnlocked: function(){
        if(!Meteor.user().accountLocked){
            Router.go('/');
        }
    }
});