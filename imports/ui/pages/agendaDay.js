

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

	coursesCountNull: function(courses) {
		return courses.length == 0;
	}
});

Template.agendaDay.events({
	'click .new_note': function(event) {
		event.preventDefault();

		$('#modal').removeClass('animated fadeInUp');
		$('#modal').addClass('animated fadeOutDown');
		$('.add-button').attr('state', 'closed');

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

	'click .add-button': function(event) {
		var state = $('.add-button').attr('state');
		if (state == 'closed') {
			$('#modal').removeClass('animated fadeOutDown');
			$('#modal').removeClass('hidden');
			$('#modal').addClass('animated fadeInUp');
			//$('.add-button i').innerHTML('close');
			$('.add-button').attr('state', 'open');
		} else {
			$('#modal').removeClass('animated fadeInUp');
			$('#modal').addClass('animated fadeOutDown');
		//	$('.add-button i').innerHTML('add');
			$('.add-button').attr('state', 'closed');
		}

	}
});
