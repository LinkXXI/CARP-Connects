Meteor.methods({
    newInvitation: function () {
        var newId = invitations.insert({
            used: false,
            generatedBy: Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName,
            validFor: []
        });
        return invitations.findOne(newId);
    },
    updateInvitation: function (inviteId, validFor) {
        invitations.update(
            {_id: inviteId},
            {
                $push: {
                    validFor: {
                        $each: validFor
                    },
                    validFor: "Any"
                }
            });
    },
    createInviteForUser: function(userID, sendMail){
        var inviteId = invitations.insert({})
    },
    createInviteForEmail: function(email, sendMail){
        var inviteId = invitations.insert({
            used: false,
            generatedBy: Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName,
            validFor:[email],
            invitationSent: sendMail
        });
        if(sendMail){
            sendMail(email);
        }
    }
});

var sendMail = function(address){
    Email.send("Here is your invitation code for CARP Connects: " + inviteId + "\n\n"
        + "If you have not signed up yet, please coppy the code into the 'ivite' field \n" +
    "if you have, <a href='" + process.env.ROOT_URL + "/applyInvite/"+inviteId+"'>Click Here</a> to apply it to your account.", address);
}