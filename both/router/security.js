/**
 * Login validation/reroute
 */
Router.onBeforeAction(function(){
    if(!Meteor.userId()){
        Router.go('/login');
    }else{
        this.next();
    }
}, {
    except: ['Login']
});

/**
 * Profile Setup validation/reroute.
 */
Router.onBeforeAction(function (){
        var profile = Meteor.user().profile;
        if(!profile.inviteCode || !profile.googleLinked || !emails[0].verified){
            Router.go('/incomplete');
        }else{
            this.next();
        }
    },
    {
        except: ['Login', 'Incomplete']
    }
);
