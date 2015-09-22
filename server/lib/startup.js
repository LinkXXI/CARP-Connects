Meteor.startup(function () {
    Accounts.config({
        sendVerificationEmail: true
    });


    Accounts.emailTemplates.from = "CARP Connects <no-reply@carpconnects@gmail.com>";
    Accounts.emailTemplates.siteName = "CARP Connects";
    Accounts.emailTemplates.verifyEmail.subject = function(user){
        return "Confirm your Email for CARP Connects";
    };
    Accounts.emailTemplates.verifyEmail.text = function(user, url){
        return "Click the link to verify your email. You will be logged in automatically!\n\n" + url;
    }

   /* Accounts.loginServiceConfiguration.remove({
        service:"google"
    });
    Accounts.loginServiceCon*/
});