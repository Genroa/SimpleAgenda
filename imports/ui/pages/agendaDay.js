

import './agendaDay.html';

Template.agendaDay.helpers({
	currentYear: function() {
		return Router.current().params.year;
	},

	currentMonth: function() {
		return Router.current().params.month;
	},

	currentDay: function() {
		return Router.current().params.day;
	},

	getNotes: function() {
		return Note.find({});
	},

	unNotedCourses: function() {
		let year = parseInt(Router.current().params.year);
		let month = parseInt(Router.current().params.month);
		let day = parseInt(Router.current().params.day);
		let date = new Date(year, month, day);

		let courses = Course.find({}, {sort: {name: 1}});
		let returnedCourses = [];
		courses.forEach(function(course) {
			if(!Note.findOne({user: Meteor.userId(), course: course._id, date: date})) {
				returnedCourses.push(course);
			}
		});
		return returnedCourses;
	}
});

Template.agendaDay.onRendered(function() {
	$('select').material_select();
});

Template.agendaDay.events({
	'click .submit_new_note': function(event) {
		event.preventDefault();
		let noteCourse = $('.new_note_form .note_course').val();
		let year = parseInt(Router.current().params.year);
		let month = parseInt(Router.current().params.month);
		let day = parseInt(Router.current().params.day);
		let date = new Date(year, month, day);

		Meteor.call("newNote", noteCourse, "", date, function(err, result){
			if(err) {
				console.log(err.reason);
			} else {
				console.log("Note créée");
			}
		});
	}
});