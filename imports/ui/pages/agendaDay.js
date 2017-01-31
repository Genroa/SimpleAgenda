

import './agendaDay.html';
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
	Meteor.setInterval(function(){
		$('select').material_select();
		$('ul.notes_tab').tabs();
		$('.note_container').show();
		$('.content_area').trigger('autoresize');
		console.log("initialisation faite");
	}, 1500);
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
				$('ul.notes_tab').tabs();
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
	}
});