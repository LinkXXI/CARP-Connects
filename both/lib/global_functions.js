/**
 * Created by Sergio on 10/27/2015.
 */
formatDateShort = function(date){
    return moment(date).format('MMM Do YYYY, h:mm a');
};

formatDateMDYT = function(date){
    return moment(date).format('D/M/YYYY h:mm a');
};

formatDateTable = function(date){
    return moment(date).format('YYYY/MM/DD hh:mm a');
};

formatDateDefault = function(date){
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
};

formatCurrency = function(amount){
    return "$" + parseFloat(amount).toFixed(2);
};

compareName = function compareName(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
};

formattedRoleText = function(role) {
    if (role) {
        switch (role) {
            case "Admin":
                return "Administrator";
            case "user":
                return "Volunteer";
            case "incomplete":
                return "Incomplete Profile";
            default:
                return role;
        }
    }
    return "";
}

checkPermissions = function(permissionFlag){
    var permissions = Meteor.user().profile.permissions;
    if(permissions.role === "Admin"){
        return true;
    }
    switch(permissionFlag){
        case EDT_EVENT:
            return permissions.editEvent;
        case CREATE_EVENT:
            return permissions.createEvent;
        case PUBLISH_EVENT:
            return permissions.publishEvent;
        case CREATE_TASK:
            return permissions.createTask;
        case EDIT_TASK:
            return permissions.editTask;
        default:
            return false;
    }

    return false;
};

closeAndResetModal = function(modal) {
    var modal = $(modal);
    modal.closeModal();
    modal.find('form')[0].reset();
};
