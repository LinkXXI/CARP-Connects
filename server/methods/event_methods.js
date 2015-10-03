/**
 * Created by Sergio on 10/3/2015.
 */
Meteor.methods({
    eventInsert: function (eventAttributes) {
        //check(this.userId, String);
        //check(postAttributes, {
        //    title: String,
        //    url: String
        //});
        //var errors = validatePost(postAttributes);
        //if (errors.title || errors.url)
        //    throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

        var user = Meteor.user();
        var event = _.extend(eventAttributes, {
            owner: user._id
        });

        events.insert(event);
    }
});