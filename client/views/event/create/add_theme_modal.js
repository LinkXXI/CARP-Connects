/**
 * Created by Sergio on 11/26/2015.
 */
Template.addThemeModal.events({
    'click #cancel-add-theme-button': function (e) {
        closeAndResetModal('#add-theme-modal');
    },
    "submit #add-theme-form": function (e) {
        e.preventDefault();
        var theme = {
            name: $(e.target).find('#theme-name').val()
        };
        Meteor.call('themeInsert', theme, function (error, result) {
            // display the error to the user and abort
            if (error) {
                sAlert.error(THEME_INSERT_ERROR);
                return throwError(error.reason);
            }
            // show this result but route anyway
            else {
                var modal = $('#add-vendor-modal');
                modal.closeModal();
                modal.find('form')[0].reset();
                sAlert.success(THEME_INSERT_SUCCESS);
            }
        });
        closeAndResetModal('#add-theme-modal');
    }
});