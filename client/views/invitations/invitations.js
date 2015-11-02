Template.invitations.events({
    'click #new-invite': function () {
        var addModal = $('#addModal');
        addModal.openModal({
            ready: function () {
                addModal.find('.tabs').tabs();
                addModal.find('select').material_select();
            },
            complete: function(){

            }
        });
    }
});

Template.invitations.helpers({
    invitations: function () {
        return invitations.find();
    },
    uninvitedUsers: function () {
        return Meteor.users.find({'profile.inviteCode': null});
    }
});