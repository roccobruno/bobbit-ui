var jq = require("jquery");
window.React = require('react');
var react = require("react");

window.onbeforeunload  = function() {
    console.log(window.disablePopUpDailog);
    if (window.disablePopUpDailog) {
        return window.close();
    } else {
        return "Please save your changes before going back from this page...";
    }
}
