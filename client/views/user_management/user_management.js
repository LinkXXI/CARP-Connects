Template.userManagement.helpers({
    users: function(){
        return Meteor.users.find();
    }
});

Template.user.events({
   "click #userOptions": function(e, template){
       $(template.lastNode).openModal();
   },
    "click #lockUser": function(){
        if(Meteor.userId() === this._id){
            return;
        }
        Meteor.call('disableAccount', this._id, function (err, data) {
            if(err){
                console.log(err);
            }
        })

    },
    "click #unlockUser": function(){
        Meteor.call('enableAccount', this._id, function (err, data) {
            if(err){
                console.log(err);
            }
        })
    },
    "click #forceInvite": function(){
        var context = this;
        Meteor.call('newInvitation', function(err, data){
            if(err){
                console.log(err);
            }else{
                Meteor.call('validateInvitation', data._id, context._id, function (err, data) {
                    if(err){
                        console.log(err)
                    }else{

                    }
                })
            }
        })
    }
});

Template.user.helpers({
   primaryEmail: function () {
       return this.emails[0].address;
   },
    inviteApplied: function(){
        return !!this.profile.inviteCode;
    },
    profileComplete: function(){
        return Meteor.user().emails[0].verified && Meteor.user().profile.inviteCode && Meteor.user().profile.googleLinked;
    }
});