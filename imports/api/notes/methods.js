


Meteor.methods({
	newNote: function(noteCourse, content, date) {
		if(!Meteor.userId()) return;
		var newNote = new Note({user: Meteor.userId(), 
								course: noteCourse, 
								content: content,
								date: date});
		newNote.save();
	},

	deleteNote: function(id) {

	}
});