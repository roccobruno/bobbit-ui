var jq = require("jquery");
var react = require("react");

// This enables the react tools.
window.React = require('react');

var Login = require("./../react/login.jsx");
var QueryString = require("../querystring.js");

function renderLogin() {
    var error = QueryString.error;
    Login.render(document.getElementById("application"),error);
}

jq(document).ready(function () {

        renderLogin();
});

function logErrorToConsole(e) {
    console.log(e);
}
