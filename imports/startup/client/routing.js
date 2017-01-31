
import { Meteor } from 'meteor/meteor';
import { Router, RouteController } from 'meteor/iron:router';

import '../../api/courses/definition.js';
import '../../api/notes/definition.js';


/* Controleur standard qui fait les vérifications de base:
- redirection vers l'accueil si pas loggé

On peut se le permettre vu que ce sont les seules vérifications à faire, et qu'elles sont globales
sur toute l'application
*/

ApplicationController = RouteController.extend({
	onBeforeAction: function() {
		if(!this.ready() || Meteor.loggingIn()) {
			this.next();
			//this.render('loading');
		}
		else {
			var user = Meteor.user();
			// pas loggé
			if(!user) {
				//console.log("Redirection to login page...");
				Session.set("infoMessage", "Loggez vous");
				//this.layout(undefined);
				this.render('login');
			}
			else {
				//this.layout("appLayout");
				this.next();
			}
		}
	}
});

/*
Configuration globale du routeur : on définit le controlleur par défaut pour toute route
*/
Router.configure({
	controller: 'ApplicationController',
	notFoundTemplate: 'notFoundTemplate',
	layoutTemplate: 'appLayout'
});


// Accueil
Router.route('/', {
	name: 'home',
	action: function() {
		Router.go('/agenda');
	}
});


// Login/rgister
Router.route('/login', {
	name: 'login',
	action: function() {
		this.render('login');
	}
});


// Gestion des matières/domaines
Router.route('/management', {
	name: 'management',
	subscriptions: function() {
		return Meteor.subscribe("user-courses", Meteor.userId());
	},
	data: function() {
		return {
			courses: Course.find({user: Meteor.userId()}, {sort: {name: 1}})
		};
	},
	action: function() {
		this.render('management');
	}
});


// Affichage agenda année actuelle
Router.route('/agenda', {
	name: 'agenda',
	action: function() {
		let currentYear = new Date().getFullYear();
		Router.go('/agenda/'+currentYear);
	}
})

// Affichage agenda année
Router.route('/agenda/:year', {
	name: 'agenda-year',
	action: function() {
		this.render('agendaYear');
	}
});

// Affichage agenda mois
Router.route('/agenda/:year/:month', {
	name: 'agenda-month',
	action: function() {
		this.render('agendaMonth');
	}
});

// Affichage agenda jour
Router.route('/agenda/:year/:month/:day', {
	name: 'agenda-day',
	subscriptions: function() {
		let year = parseInt(Router.current().params.year);
		let month = parseInt(Router.current().params.month);
		let day = parseInt(Router.current().params.day);

		return [Meteor.subscribe("user-courses", Meteor.userId()), 
				Meteor.subscribe("user-notes", Meteor.userId(), new Date(year, month, day))];
	},
	action: function() {
		this.render('agendaDay');
	}
});