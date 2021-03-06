Template.postSubmit.events({
	'submit form': function(event) {
		event.preventDefault();

		var post = {
			url: $(event.target).find('[name=url]').val(),
			title: $(event.target).find('[name=title]').val(),
			message: $(event.target).find('[name=message]').val()
		}

		Meteor.call('post', post, function (error, id) {
			if (error) {
				// Display error to the user
				Meteor.Errors.throw(error.reason);

				// If the error is that the post already exists, redirect user
				if (error.error == 302) 
					Meteor.Router.to('postPage', error.details)
			} else {
				Meteor.Router.to('postPage', id);
			}
		});
	}
});