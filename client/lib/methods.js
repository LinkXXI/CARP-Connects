/**
 * Client side methods
 *
 * This file contains Client Side only methods for re-use.
 */

verifyEmail = function () {
    if (Accounts._verifyEmailToken) {
        Accounts.verifyEmail(Accounts._verifyEmailToken, function (err) {
                if (err) {
                    if (err.message = 'Verify email link expired [403]') {
                        var modal = generateErrorModal("Your verification link has expired, Please click 'Resend Validation Email'");
                        $(modal).openModal();
                    }
                    console.log(err);
                }
            }
        );
    }
};

//NOTE: var essentially makes the variable/function "private" to the file that it is declared in.
var generateErrorModal = function (message) {
    var modal = document.createElement("div");
    modal.id = "error-modal";
    modal.classList.add("modal");

    var content = document.createElement("div");
    content.classList.add("modal-content");
    $(content).html(message);

    modal.appendChild(content);

    var footer = document.createElement("div");
    footer.addClass("modal-footer");

    var closeBtn = document.createElement("a");
    closeBtn.href = "#!";
    closeBtn.classList.add("modal-action");
    closeBtn.classList.add("modal-close");
    closeBtn.classList.add("waves-effect");
    closeBtn.classList.add("waves-green");
    closeBtn.classList.add("btn-flat");
    closeBtn.textContent = "Agree";

    footer.appendChild(closeBtn);

    modal.appendChild(footer);
    document.appendChild(modal);

    return modal;
};

// setup forget password email link direct
Accounts.onResetPasswordLink(function(token) {
    //TODO: Logic for password resetting (new password input form)
});