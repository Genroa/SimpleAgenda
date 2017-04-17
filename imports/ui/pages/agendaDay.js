'esversion: 6';

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
};

Template.agendaDay.onCreated(function(){
	this.typingTimer;
	this.doneTypingInterval = 800;
});

Template.agendaDay.onRendered(function() {
	$('#modal').addClass('modal-fade-out');
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
		return courses.length === 0;
	},

	getWeekFromDay: function() {
		let weekDays = [];
		let year = parseInt(Router.current().params.year);
		let month = parseInt(Router.current().params.month-1);
		let dayNumber = parseInt(Router.current().params.day);
		let day = new Date(year, month, dayNumber);
		let dayNumberInWeek = day.getDay();
		let numberFirstDayOfWeek = dayNumber - dayNumberInWeek + (dayNumberInWeek === 0?-6:1);

		console.log(dayNumber + "-" + dayNumberInWeek + "=" + (dayNumber - dayNumberInWeek));
		for (let i = numberFirstDayOfWeek; i < numberFirstDayOfWeek + 7; i++) {
			let d = new Date(year, month, i);
			weekDays.push(d);
		}
		console.log(weekDays);
		return weekDays;
	},

	getNumberOfTasks: function(day) {
		let notes = Note.find({user: Meteor.userId(), date: day});
		let count = notes.count();
		return count + (count > 1?" notes":" note");
	}
});

Template.agendaDay.events({
	'click .new_note': function(event) {
		event.preventDefault();

		//$('#modal').removeClass('animated fadeInUp');
		$('#modal').addClass('modal-fade-out');
		$('.add-button i').html('add');
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

			}
		});

	},

	'click .delete_note' : function(event) {
		event.preventDefault();
		let noteID = $(event.target).attr("value");
		if(noteID == undefined) {
			noteID = $(event.target).parent(".delete_note").attr("value");
		}
		console.log(event.target.parent);
		console.log(noteID);
		Meteor.call("deleteNote", noteID, function(err, result){
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
			//$('#modal').removeClass('animated fadeOutDown');
			//$('#modal').removeClass('hidden');
			//$('#modal').addClass('animated fadeInUp');
			$('#modal').removeClass('modal-fade-out');
			$('.add-button i').html('close');
			$('.add-button').attr('state', 'open');
		} else {
			//$('#modal').removeClass('animated fadeInUp');
		//	$('#modal').addClass('animated fadeOutDown');
			$('#modal').addClass('modal-fade-out');
			$('.add-button i').html('add');
			$('.add-button').attr('state', 'closed');
		}

	}
});
