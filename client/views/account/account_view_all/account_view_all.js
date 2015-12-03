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
                    return phone.type + ": " + phone.number;
                }
            }
        }

    },
    role: function() {
        return formattedRoleText(this.profile.permissions.role);
    }
});