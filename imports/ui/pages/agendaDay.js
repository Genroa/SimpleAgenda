

import './agendaDay.html';
import './agendaDay.css';
import { ReactiveVar } from 'meteor/reactive-var';



doneTyping = function(element) {
	console.log("key up");
	Meteor.call("updateNoteContent", element.attr("note"), element.val(), function(err, result){
		if(err) {
			console.log(err.reason);
		} else {
			$('.content_area').trigger('autoresize');
		}
	});
}

Template.agendaDay.onCreated(function(){
	this.typingTimer;
	this.doneTypingInterval = 800;
});

Template.agendaDay.onRendered(function() {
	$('select').material_select();
	$('.notes_tab').tabs({swipeable: true});
	$('.note_container').show();
	$('.content_area').trigger('autoresize');
	$('#modal1').modal();
});

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
		let year = parseInt(Router.current().params.year);
		let month = parseInt(Router.current().params.month-1);
		let day = parseInt(Router.current().params.day);
		let date = new Date(year, month, day);

		return Note.find({date: date});
	},

	unNotedCourses: function() {
		let year = parseInt(Router.current().params.year);
		let month = parseInt(Router.current().params.month-1);
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
	},

	coursesCountNotNull: function(courses) {
		return courses.length !== 0;
	}
});

Template.agendaDay.events({
	'click .new_note': function(event) {
		event.preventDefault();
		let noteCourse = $(event.target).attr("courseId");
		let year = parseInt(Router.current().params.year);
		let month = parseInt(Router.current().params.month-1);
		let day = parseInt(Router.current().params.day);
		let date = new Date(year, month, day);

		Meteor.call("newNote", noteCourse, "", date, function(err, result){
			if(err) {
				console.log(err.reason);
			} else {
				console.log("Note créée");
				$('ul.notes_tab').tabs();
				$('#modal1').modal('close');
			}
		});

	},

	'click .delete_note' : function(event) {
		event.preventDefault();
		Meteor.call("deleteNote", $(event.target).attr("value"), function(err, result){
			if(err) {
				console.log(err.reason);
			}
		});
	},

	'keyup .content_area': function(event) {
		//event.preventDefault();
		clearTimeout(Template.instance().typingTimer);
		Template.instance().typingTimer = setTimeout(doneTyping,
														  Template.instance().doneTypingInterval,
														  $(event.target));
	},

	'keydown .content_area': function(event) {
		//event.preventDefault();
		clearTimeout(Template.instance().typingTimer);
		console.log("key down");
	},

	'click .btn-floating': function(event) {
		$('#modal1').modal('open');
	}
});
