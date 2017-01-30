


import { Class } from "meteor/jagi:astronomy";

Note = Class.create({
	name: 'Note',
	collection: new Mongo.Collection('notes'),
	fields: {
		user: String,
		course: String,
		content: String,
		date: Date
	}
});


import './methods.js';