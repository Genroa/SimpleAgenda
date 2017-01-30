


import { Class } from "meteor/jagi:astronomy";

Course = Class.create({
	name: 'Course',
	collection: new Mongo.Collection('courses'),
	fields: {
		user: String,
		name: String,
		color: String
	}
});

import './methods.js';