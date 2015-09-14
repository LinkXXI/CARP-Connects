Template.login.events({
    "submit #login": function (e, template) {
        e.preventDefault();
    },
    "submit #signup": function (e, template) {
        e.preventDefault();

    },
    "click #signup": function(){
        $('#signup-modal').openModal();
    }
});