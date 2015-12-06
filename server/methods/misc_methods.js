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
        var user = Meteor.users.findOne({_id: userID});
        if (user) {
            var inviteId = invitations.insert({
                used: false,
                generatedBy: Meteor.userId(),
                validFor: [user._id],
                invitationSent: sendMail
            });
            if (sendMail) {
                sendInvitationMessage(user.emails[0].address, inviteId)
            }
            return inviteId;
        }
        return false;
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
        invitations.remove({_id: inviteId});
    },
    upsertConfigItem: function (item, value) {
        configuration.upsert( { name: item }, {$set: { value: value } });
    }
});

var sendInvitationMessage = function (address, inviteId) {
    Email.send({
        to: address,
        from: Accounts.emailTemplates.from,
        subject: "You've been invited to CARP Connects!",
        html: "Hello,<br><br>"
        + "Here is your invitation code for CARP Connects: " + inviteId + "<br/><br/>"
        + "If you have not signed up yet, please click on the following link to sign up: "
        + "<a href='" + Router.routes.Signup.url({inviteId: inviteId}) + "'>" + Router.routes.Signup.url({inviteId: inviteId}) + "</a><br/>"
        + "If you have already signed up and logged in, please click the following link to apply it to your account: " + "<a href='" + Router.routes.ApplyInvitation.url({_id: inviteId}) + "'>" + Router.routes.ApplyInvitation.url({_id: inviteId}) + "</a><br><br>"
        + "The " + Accounts.emailTemplates.siteName + " Team"
    });
};
