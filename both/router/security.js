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
        var event = events.findOne(this.params._id);
        var taskList = events.find().fetch();
        var assignedToTask = false;
        $.each(taskList, function () {
            if(this.userIdAssignedTo == Meteor.userId){
                assignedToTask = true;
            }
        });
        if (checkPermissions(EDT_EVENT) || event.owner == Meteor.userId() || assignedToTask) {
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
        var event = events.findOne(this.params._id);
        if (checkPermissions(PUBLISH_EVENT) || event.owner == Meteor.userId()) {
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
        if (checkPermissions("")) {
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

//TODO: consolidate security function here and make it reusable