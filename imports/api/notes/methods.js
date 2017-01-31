


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
		if(!Meteor.userId()) return;
		let note = Note.findOne({_id: id, user: Meteor.userId()});
		if(!note) {
			throw new Meteor.Error("note-delete-error", "No note belonging to this user is using this id :"+id);
		}
		if(note.user != Meteor.userId()) {
			throw new Meteor.Error("note-delete-error", "No note belonging to this user is using this id");
		}
		note.remove({_id: id, user: Meteor.userId()});
	},

	updateNoteContent: function(id, content) {
		if(!Meteor.userId()) return;
		let note = Note.findOne({_id: id, user: Meteor.userId()});
		if(!note) {
			throw new Meteor.Error("note-update-error", "No note belonging to this user is using this id :"+id);
		}
		if(note.user != Meteor.userId()) {
			throw new Meteor.Error("note-update-error", "No note belonging to this user is using this id");
		}
		note.content = content;
		note.save();
	}
});