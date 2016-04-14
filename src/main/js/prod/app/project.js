var jq = require("jquery");
var react = require("react");

// This enables the react tools.
window.React = require('react');

var api = require("../api.js");
var Project = require("./../react/project.jsx");

function renderUser() {
    Project.render(document.getElementById("application"));
}

jq(document).ready(function () {

        renderUser();
});

function logErrorToConsole(e) {
    console.log(e);
}

