

import { Session } from 'meteor/session';
import './colorPalette.html';


Template.color_palette_component.onRendered(function(){
	$.cssHooks.backgroundColor = {
		get: function(elem) {
			if (elem.currentStyle)
				var bg = elem.currentStyle["backgroundColor"];
			else if (window.getComputedStyle)
				var bg = document.defaultView.getComputedStyle(elem,
				null).getPropertyValue("background-color");
			
			if (bg.search("rgb") == -1)
				return bg;
			else {
				bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				function hex(x) {
					return ("0" + parseInt(x).toString(16)).slice(-2);
				}
				return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			}
		}
	}

	let instance = Template.instance();
	let jsColorId = "#jscolor_"+instance.data.index;
	instance.jsc = new jscolor($(jsColorId)[0], {hash: true});
	
	if(Session.get("changingColorPalette")) {
		console.log("show");
		instance.jsc.show();
		Session.set("changingColorPalette", false);
	}

	$(jsColorId).css("color", $(jsColorId).css("backgroundColor").toUpperCase());
});

Template.color_palette_component.events({
	'change .jscolor' : function(evt) {
		console.log("change");
		let elem = $(evt.target);
		let instance = Template.instance();
		console.log(elem.css("backgroundColor").toUpperCase());

		instance.jsc.hide();
		Session.set("changingColorPalette", true);

		Meteor.call("changeColorPalette", Template.instance().data.index, elem.css("backgroundColor").toUpperCase(), function(err) {
			if(err) console.log(err);
			
		});
	}
});