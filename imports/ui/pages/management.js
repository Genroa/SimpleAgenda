

import './management.html';


Template.management.onRendered(function(){
	new jscolor($(".course_color")[0], {hash: true});
});

Template.management.events({
	'submit .new_course_form': function(event) {
		event.preventDefault();
		let courseName = $('.new_course_form .course_name').val();
		let courseColor = $('.new_course_form .course_color').val();

		Meteor.call("newCourse", courseName, courseColor, function(err, result){
			if(err) {
				console.log(err.reason);
			} else {
				$('.new_course_form .course_name').val("");
				$('.new_course_form .course_color').val("");
			}
		});
	},
	'click .delete_course': function(event) {
		Meteor.call("deleteCourse", $(event.target).attr("value"), function(err, result){
			if(err) {
				console.log(err.reason);
			}
		});
	}
});