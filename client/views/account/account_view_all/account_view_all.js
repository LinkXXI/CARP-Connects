Template.account.helpers({
    primaryEmail: function () {
        return this.emails[0].address;
    },
    primaryPhone: function() {
        var phones = this.profile.phones;
        if (phones) {
            for (var i=0;i<phones.length;i++) {
                var phone = phones[i];
                if (phone.primary) {
                    return phonetypes.findOne({_id:phone.type}).type + ": " + phone.number;
                }
            }
        }
    },
    role: function() {
        return formattedRoleText(this.profile.permissions.role);
    },
    profilePicAttr: function () {
        return {
            src: this.services.google.picture || "",
            style: 'width: 48px;',
            class: "circle responsive-img valign left"
        };
    }
});