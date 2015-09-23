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
                    }
                }
            });
    }
});