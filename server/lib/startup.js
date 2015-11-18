Meteor.startup(function () {
    Accounts.config({
        sendVerificationEmail: true
    });

    var smtp = {
        username: 'carp.connects.test@gmail.com',
        password: 'carpconnectsadmin',
        server: 'smtp.gmail.com',
        port: 465
    }
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    Accounts.emailTemplates.from = "CARP Connects <carp.connects.test@gmail.com>";
    Accounts.emailTemplates.siteName = "CARP Connects";
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return "Confirm your Email for CARP Connects";
    };
    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
        var userId = user._id;
        var address = user.emails[0].address;

        var invitation = invitations.findOne({
            validFor: {$in: [address, userId]},
            used: false
        });

        if (invitation) {
            return "Click the link to verify your email. You will be logged in automatically!\n\n" + url + "\n\n" +
                "Your invitation code is: " + invitation._id + "\n" +
                "<a href='" + process.env.ROOT_URL + "applyInvite/" + invitation._id + "'>Click Here</a> to apply the invite to your account, or enter the above code manually once you log in.";
        } else {
            return "Click the link to verify your email. You will be logged in automatically!\n\n" + url;
        }

    };

    AccountsMerge.onMerge = function (winner, loser) {
        //tet googleLinked to true for user.
        Meteor.users.update(
            {_id: winner._id},
            {
                $set: {
                    'profile.googleLinked': true
                }
            }
        );
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