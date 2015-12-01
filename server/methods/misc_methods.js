Meteor.methods({
    newInvitation: function () {
        var newId = invitations.insert({
            used: false,
            generatedBy: Meteor.userId(),
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
                    }
                }
            });
    },
    createInviteForUser: function (userID, sendMail) {
        var inviteId = invitations.insert({
            used: false,
            generatedBy: Meteor.userId(),
            validFor: [userID],
            invitationSent: sendMail
        });
        if(sendMail){
            sendMail(Meteor.users.find({_id:userID}).emails[0].address);
        }
        return inviteId;
    },
    createInviteForEmail: function (email, sendMail) {
        var inviteId = invitations.insert({
            used: false,
            generatedBy: Meteor.userId(),
            validFor: [email],
            invitationSent: sendMail
        });
        if (sendMail) {
            sendInvitationMessage(email, inviteId);
        }

        return inviteId;
    },
    removeInvitation: function (inviteId) {
        invitations.remove({_id:inviteId});
    }
});

var sendInvitationMessage = function (address, inviteId) {
    Email.send({
        to: address,
        from: Accounts.emailTemplates.from,
        subject: "CARP Connects Invite Code",
        text: "Here is your invitation code for CARP Connects: " + inviteId + "\n\n" + "If you have not signed up yet, please copy the code into the 'Invite Code' field during sign up here: " + process.env.ROOT_URL + "\n" +
        "If you have already signed up, <a href='" + process.env.ROOT_URL + "applyInvite/" + inviteId + "'>Click Here</a> to apply it to your account."
    });
};