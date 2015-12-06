Meteor.startup(function () {
    /* had to manually send verification email after createuser, below code did not work
     Accounts.config({
     sendVerificationEmail: true
     });
     */

    var smtp = {
        username: 'carp.connects.test@gmail.com',
        password: 'carpconnectsadmin',
        server: 'smtp.gmail.com',
        port: 465
    }
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    Accounts.emailTemplates.from = "CARP Connects <no-reply@carpconnects.com>";
    Accounts.emailTemplates.siteName = "CARP Connects";
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return "Confirm your Email for CARP Connects";
    };
    Accounts.emailTemplates.verifyEmail.html = function (user, url) {
        var userId = user._id;
        var address = user.emails[0].address;

        var invitation = invitations.findOne({
            validFor: {$in: [address, userId]},
            used: false
        });

        if (invitation) {
            return "Click the link to verify your email. You will be logged in automatically!<br/><br/><a href='" + url + "'>" + url + "</a><br/><br/>" +
                "Your invitation code is: " + invitation._id + "<br/>" +
                "To apply the invite to your account, please login and click on the following link: <a href='" + Router.routes.ApplyInvitation.url({_id: invitation._id}) + "'>" + Router.routes.ApplyInvitation.url({_id: invitation._id}) + "</a>";
        } else {
            return "Click the link to verify your email. You will be logged in automatically!<br/>" + url;
        }

    };

    AccountsMerge.onMerge = function (winner, loser) {
        //set googleLinked to true for user.
        Meteor.users.update(
            {_id: winner._id},
            {
                $set: {
                    'profile.googleLinked': true
                }
            }
        );

        if (!loser.emails) { // emails is created when user account made in Meteor, merged user accounts do not have the array
            // Remove the merged (losing) user from the DB
            //Meteor.users.remove(loser._id); // this breaks google login currently, can't remove the original merged id
        } else { // update merged user id to invalidate google linkage
            Meteor.users.update(
                {_id: loser._id},
                {
                    $set: {
                        'profile.googleLinked': false
                    },
                    $unset: {
                        mergedWith: 1
                    }
                }
            );
        }


    };

    ServiceConfiguration.configurations.upsert(
        {service: "google"},
        {
            $set: {
                clientId: "195417595857-4rj9gnsg7d59m942l4g8cq8215koim31.apps.googleusercontent.com",
                secret: "ojLPrdww-7lGlWalNxlh3ZgZ"
            }
        }
    )
});