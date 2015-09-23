Template.invitations.events({
    'click #new-invite': function () {
        Meteor.call('newInvitation', function (err, data) {
            if (err) {
                console.log(err)
            } else {
                Session.set('edit-invite', {_id: data._id})
            }
        });
    },
    'click #cancel-yes': function () {
        Session.set('cancel-edit', true);
    },
    'click #cancel-no': function () {
        Session.set('cancel-edit', false)
    },
    'click #add-add': function () {
        var addModal = $('#addModal');

        var val;

        switch (addModal.find('.active').html()) {
            case "Existing User":
                val = {value: addModal.find('select').val(), type: "existing"};
                break;
            case "New User":
                val = {
                    value: addModal.find('#email').val(),
                    type: "new",
                    sendInvite: addModal.find('sendEmail').is(":checked")
                };
                break;
        }

        Session.set('addUser', val)
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

Template.invitations.created = function () {
    Session.set('edit-invite', {_id: "none"})
};

Template.invitation.helpers({
    checkUsed: function () {
        return this.used;
    },
    redeemList: function () {
        var list = "";
        $.each(this.validFor, function () {
            list += this + ", ";
        });
        return list;
    },
    redeemEdits: function () {
        var list = "";
        var edits = Session.get(this._id + "-edits");
        if (edits) {
            $.each(edits.redeemBy, function () {
                list += this + ", ";
            });
            return list;
        }
    },
    userName: function () {
        if (this.appliedTo) {
            var user = Meteor.users.findOne({_id: this.appliedTo});
            return user.profile.firstName + " " + user.profile.lastName;
        }
    },
    edit: function () {
        var edit = Session.get('edit-invite');
        return edit._id === this._id;
    }
});

Template.invitation.events({
    "click #save": function (e) {
        e.preventDefault();
    },
    "click #cancel": function (e) {
        var data = this;
        if(Session.get(this._id + "-edits")) {
            $('#cancelModal').openModal({
                complete: function () {
                    if (Session.get('cancel-edit')) {
                        Session.set('edit-invite', {_id: "none"});
                        Session.set(data._id + '-edits', undefined);
                        //TODO: Other cancel important stuff
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
    },
    "click #edit": function (e) {
        //console.log(e.target.id);
        if (Session.get('edit-invite')._id !== "none") {

        } else {
            Session.set("edit-invite", {_id: this._id})
        }
    },
    'click #addEligible': function () {
        var data = this;
        var addModal = $('#addModal');
        addModal.openModal({
            ready: function () {
                addModal.find('.tabs').tabs();
                addModal.find('select').material_select();
            },
            complete: function () {
                console.log(data._id);
                var edits = Session.get(data._id + "-edits");
                var modalData = Session.get('addUser');
                //TODO: Modularize!
                if (edits === undefined) {
                    Session.set(data._id + "-edits", {redeemBy: [modalData.value]});
                    switch (modalData.type) {
                        case "existing":
                            break;
                        case "new":
                            //TODO: Serverside call to send email to user.
                            break;
                    }
                } else {
                    edits.redeemBy.push(modalData.value);
                    Session.set(data._id + "-edits", edits);
                    switch (modalData.type) {
                        case "existing":
                            break;
                        case "new":
                            //TODO: Serverside call to send email to user.
                            break;
                    }
                }
                //data.validFor.push(modalData.value);
                Session.set('addUser', undefined);
            }
        });
    }
});