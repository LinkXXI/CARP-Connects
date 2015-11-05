Template.applyInvite.created = function () {
    Meteor.call("validateInvitation", Template.parentData()._id, function (err, data) {
        if(err){
            console.log(err);
            Router.go('/');
        }else{
            if(data){
                Router.go('/');
            }else{
                Session.set('inviteError', true);
                Router.go('/');
            }
        }
    })
};