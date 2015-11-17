Template.forgotPassword.events({
    "submit #passreset-form": function (e) {
        e.preventDefault();
        var $passresetModal = $('#passreset-modal');
        var emailConfirm = $(e.target).find('#emailConfirm').val();
        //TODO: meteor add audit-argument-checks
        /*
         check(emailConfirm, {
         address: String
         });
         */
        Accounts.forgotPassword({email: emailConfirm}, function (err) {
            if (err) {
                sAlert.error(ACCOUNT_FORGOT_PASSWORD_ERROR);
            } else {
                sAlert.success(ACCOUNT_FORGOT_PASSWORD_SUCCESS);
            }
        });
        $passresetModal.find('form')[0].reset();
        $passresetModal.closeModal();
    }
});