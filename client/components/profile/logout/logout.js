Template.logout.events({
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