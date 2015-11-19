/**
 * Login validation/reroute
 */
Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        Router.go('/login');
    } else {
        this.next();
    }
}, {
    except: ['Login', 'ForgotPassword']
});

/**
 * Profile Setup validation/reroute.
 */
Router.onBeforeAction(function () {
        if (Meteor.user()) {
            var profile = Meteor.user().profile;
            if (!profile.inviteCode || !profile.googleLinked || !Meteor.user().emails[0].verified) {
                Router.go('/incomplete');
            } else {
                this.next();
            }
        }
    },
    {
        except: ['Login', 'ForgotPassword', 'Incomplete', 'AccountLocked', 'ApplyInvitation']
    }
);

Router.onBeforeAction(function () {
        if (Meteor.user()) {
            if (Meteor.user().profile.accountLocked) {
                Router.go('/accountLocked');
            } else {
                this.next();
            }
        }
    },
    {
        except: ['Login', 'ForgotPassword', 'AccountLocked']
    });

/**
 * Account Management editing validation/reroute
 */
Router.onBeforeAction(function () {
        var role = Meteor.user().profile.permissions.role;
        if (Meteor.userId() === this.params._id || role === "Admin") {
            this.next();
        } else {
            sAlert.error(ACCOUNT_EDIT_NO_PERMISSION_ERROR);
            Router.go('/');
        }
    },
    {
        only: ['AccountEdit']
    }
);

Router.onBeforeAction(function () {
        var params = {
            event: events.findOne(this.params._id),
            tasksAssignedTo: tasks.find({userIdAssignedTo: Meteor.userId()}).count()
        };

        if (checkPermissions(EDT_EVENT, params)) {
            this.next();
        } else {
            //history.go(-1);
            sAlert.error(EVENT_EDIT_NO_PERMISSION_ERROR);
            Router.go('/');
        }
    },
    {
        only: ['EventEdit']
    }
);
Router.onBeforeAction(function () {
        var params = {
            event: events.findOne(this.params._id)
        };
        if (checkPermissions(PUBLISH_EVENT, params)) {
            this.next();
        } else {
            //history.go(-1);
            sAlert.error(EVENT_PUBLISH_NO_PERMISSION_ERROR);
            Router.go('/');
        }
    },
    {
        only: ['EventPublish']
    }
);

Router.onBeforeAction(function () {
        if (checkPermissions()) {
            this.next();
        } else {
            //history.go(-1);
            sAlert.error(ADMIN_ONLY_ERROR);
            Router.go('/');
        }
    },
    {
        only: ['Reports', 'TaskReport', 'Invitations', 'UserManagement']
    }
);

// This function is an all or nothing permissions checker.
checkPermissions = function(permissionFlag, params){
    if (!Meteor.user()) {
        return false;
    }
    var permissions = Meteor.user().profile.permissions;
    if(permissions.role === "Admin"){
        return true;
    }
    switch(permissionFlag){
        case EDT_EVENT:
            return permissions.editEvent && function() {
                    return (params.event.owner == Meteor.userId() || params.tasksAssignedTo > 0); // check business criteria, add logic here if required
                };
        case CREATE_EVENT:
            return permissions.createEvent;
        case PUBLISH_EVENT:
            return permissions.publishEvent && function() {
                    return (params.event.owner == Meteor.userId());
                };
        case CREATE_TASK:
            return permissions.createTask;
        case EDIT_TASK:
            return permissions.editTask;
        default:
            return false;
    }

    return false;
};