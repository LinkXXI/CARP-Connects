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
    },
    'click #add-add': function () {
        var addModal = $('#addModal');

        var val;

        switch (addModal.find('.active').html()) {
            case "Existing User":
               // val = {value: addModal.find('select').val(), type: "existing"};
                Meteor.call("createInviteForUser", addModal.find('select').val(), false, function(err, data){
                    
                });
                break;
            case "New User":
                var emailEl = addModal.find('#email');
                var sendEl = addModal.find('sendEmail');
                Meteor.cal("createInviteForEmail", emailEL.val(), sendEl.val(), function (err, data) {
                    
                })
                break;
        }
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