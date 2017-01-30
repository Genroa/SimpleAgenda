

Meteor.methods({
	newCourse: function(courseName, courseColor) {
		if(!Meteor.userId()) return;
		var c = new Course({user: Meteor.userId(), name: courseName, color: courseColor});
		c.save();
	},

	deleteCourse: function(id) {
		let course = Course.findOne({_id: id, user: Meteor.userId()});
		if(!course) {
			throw new Meteor.Error("course-delete-error", "No course belonging to this user is using this id");
		}
		course.remove({_id: id, user: Meteor.userId()});
	}
});