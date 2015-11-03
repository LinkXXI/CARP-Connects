/**
 * Created by darkl on 9/9/2015.
 */
Template.index.helpers({
    "calendarEvents": function() {
        return this.fetch();
    }
});