Template.login.events({
    "submit form": function (e, template) {
        e.preventDefault();
    },
    "click #signup": function(){
        $('#signup-modal').openModal();
    }
});