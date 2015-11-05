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
    except: ['Login']
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
        except: ['Login', 'Incomplete', 'AccountLocked', 'ApplyInvitation']
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
        except: ['Login', 'AccountLocked']
    });

/**
 * Account Management editing validation/reroute
 */
Router.onBeforeAction(function () {
        var role = Meteor.user().profile.permissions.role;
        if (Meteor.userId() === this.params._id || role === "Administrator") {
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