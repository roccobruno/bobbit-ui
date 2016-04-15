var Projects = require("./api-project.js");
var Login = require("./api-login.js");

module.exports.Projects = Projects;

function logErrorToConsole(e) {
    console.log(e);
}