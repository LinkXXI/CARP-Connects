Template.invitations.events({
    'click #new-invite': function () {
        var addModal = $('#addModal');
        addModal.openModal({
            ready: function () {
                addModal.find('.tabs').tabs();
                if(!Session.get('select-init')){
                    addModal.find('select').material_select();
                    Session.set('select-init', true);
                }
            },
            complete: function(){
                $('#addModal').find("select option:first").attr('selected', 'selected');
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
                var sendEl = addModal.find('#sendEmail');
                Meteor.call("createInviteForEmail", emailEl.val(), (sendEl.val() === "on"), function (err, data) {
                    
                });
                break;
        }
    },
    "click #delete-yes": function () {
        Meteor.call("removeInvitation", Session.get('idToDelete'));
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

Template.invitation.helpers({
    checkUsed: function () {
        return this.used;
    },
    redeemList: function () {
        return this.validFor[0]
    },
    edit: function () {
        var edit = Session.get('edit-invite');
        return edit._id === this._id;
    }
});

Template.invitation.events({
    "click #edit": function (e) {
        //console.log(e.target.id);
        if (Session.get('edit-invite')._id !== "none") {
            cancelEdits(Session.get('edit-invite')._id,this._id);
        } else {
            Session.set("edit-invite", {_id: this._id})
        }
    },
    "click #cancel": function (e) {
        cancelEdits(this._id);
    },
    "click #delete": function(e){
        Session.set('idToDelete', this._id);
        $('#deleteModal').openModal();
        //Meteor.call("removeInvitation", this._id);
    }
});

Template.invitations.created = function () {
    Session.set('edit-invite', {_id: "none"})
};
Template.invitations.destroyed = function (){
    Session.set('select-init', undefined);
};

var cancelEdits = function(currentId, nextId){
    if(Session.get(currentId + "-edits")) {
        $('#cancelModal').openModal({
            complete: function () {
                if (Session.get('cancel-edit')) {
                    Session.set('edit-invite', {_id: "none"});
                    Session.set(currentId + '-edits', undefined);
                    //TODO: Other cancel important stuff
                    if(nextId){
                        Session.set('edit-invite', {_id: nextId});
                    }
                } else {
                    //Do Nothing

                }
                //Unsetting is important!
                Session.set('cancel-edit', undefined);
            }
        });
    }else{
        Session.set('edit-invite', {_id: "none"});
    }
};