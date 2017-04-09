import './dynTabs.html';


Template.dynTabs.onCreated = function(courseTable) {
    var layout = document.querySelector('.mdl-js-layout');
    var tabbar = document.querySelector('.mdl-layout__tab-bar');

    window.setTimeout(function () {
        dynTabs.forEach(function (elem) {
            var a = document.createElement('a');
            a.href = elem.href;
            a.classList.add('mdl-layout__tab');
            a.textContent = elem.name;
            tabbar.appendChild(a);
        });

        var tabs = document.querySelectorAll('.mdl-layout__tab');
        var panels = document.querySelectorAll('.mdl-layout__tab-panel');
        for (var i = 0; i < tabs.length; i++) {
            new MaterialLayoutTab(tabs[i], tabs, panels, layout.MaterialLayout);
            console.log("into timeout");
        }
    }, 50);
};

Template.dynTabs.helpers({
    getNotes: function() {
        let notes = Template.currentData().notes;
        console.log(notes);
        return notes.notes;
    }
});
