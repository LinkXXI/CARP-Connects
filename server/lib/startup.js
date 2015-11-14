Meteor.startup(function () {
    Accounts.config({
        sendVerificationEmail: true
    });


    Accounts.emailTemplates.from = "CARP Connects <no-reply@carpconnects@gmail.com>";
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
            {$set:{
                    'profile.googleLinked': true
                }
            }
        );
    };

    ServiceConfiguration.configurations.upsert(
        {service: "google"},
        {
            $set: {
                clientId: "609568814212-rrknv9a2chkhulvhirjm9c27e91uehv3.apps.googleusercontent.com",
                secret: "CmRQapaJC14In14dPN59ntNM"
            }
        }
    )
});