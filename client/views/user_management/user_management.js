Template.userManagement.helpers({
    users: function () {
        return Meteor.users.find();
    }
});

Template.user.events({
    "click #userOptions": function (e, template) {
        $(template.find("#optionsModal")).openModal();
    },
    "click #userPermissions": function(e, template){
        $(template.find("#permissionsModal")).openModal();
    },
    "click #lockUser": function () {
        if (Meteor.userId() === this._id) {
            return;
        }
        Meteor.call('disableAccount', this._id, function (err, data) {
            if (err) {
                console.log(err);
            }
        })

    },
    "click #unlockUser": function () {
        Meteor.call('enableAccount', this._id, function (err, data) {
            if (err) {
                console.log(err);
            }
        })
    },
    "click #forceInvite": function () {
        var context = this;
        Meteor.call('newInvitation', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                Meteor.call('validateInvitation', data._id, context._id, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {

                    }
                })
            }
        })
    },
    "click #savePermissions": function(e, template){
        var permissionsModal = $(template.find('#permissionsModal'));
        var permissions = {};
        permissions.role = permissionsModal.find('#roleSelect').val();
        permissions.createEvent = permissionsModal.find('#hasCreateEvent')[0].checked;
        permissions.editEvent = permissionsModal.find('#hasEditEvent')[0].checked;
        permissions.publishEvent = permissionsModal.find('#hasPublishEvent')[0].checked;

        Meteor.call("updatePermissions", this._id, permissions);
    },
    "click #cancelPermissions": function(e, template){
        var permissionsModal = $(template.find('#permissionsModal'));
        var permissions = this.profile.permissions;
        permissionsModal.find('#roleSelect').val(permissions.role);
        permissionsModal.find('#hasCreateEvent')[0].checked = permissions.createEvent;
        permissionsModal.find('#hasEditEvent')[0].checked = permissions.editEvent;
        permissionsModal.find('#hasPublishEvent')[0].checked = permissions.publishEvent;
    }
});

Template.user.helpers({
    primaryEmail: function () {
        return this.emails[0].address;
    },
    inviteApplied: function () {
        return !!this.profile.inviteCode;
    },
    profileComplete: function () {
        return Meteor.user().emails[0].verified && Meteor.user().profile.inviteCode && Meteor.user().profile.googleLinked;
    },
    hasPermission: function(permission){
        switch(permission){
            case EDT_EVENT:
                return this.profile.permissions.editEvent;
            case CREATE_EVENT:
                return this.profile.permissions.createEvent;
            case PUBLISH_EVENT:
                return this.profile.permissions.publishEvent;
            case CREATE_TASK:
                return this.profile.permissions.createTask;
            case EDIT_TASK:
                return this.profile.permissions.editTask;
            default:
                return false;
        }
    },
    isRole:function(role){
        return role === this.profile.permissions.role;
    }
});