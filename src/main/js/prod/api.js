var Projects = require("./api-project.js");
var CourtesyCalls = require("./api-courtesycall.js");
var Clients = require("./api-client.js");
var ClientCrew = require("./api-crew.js");
var Companies = require("./api-company.js");
var ProjectComments = require("./api-projectcomment.js");
var ProjectPeriods = require("./api-projectperiod.js");
var ClientComments = require("./api-clientcomment.js");
var ProjectClient = require("./api-projectclient.js");
var ProjectCrew = require("./api-projectcrew.js");
var CompanyCrew = require("./api-companycrew.js");
var ClientDocuments = require("./api-clientdocument.js");
var ProjectDocuments = require("./api-projectdocument.js");
var Login = require("./api-login.js");

module.exports.CourtesyCalls = CourtesyCalls;
module.exports.ClientDocuments = ClientDocuments;
module.exports.ProjectDocuments = ProjectDocuments;
module.exports.Projects = Projects;
module.exports.Clients = Clients;
module.exports.ClientCrew = ClientCrew;
module.exports.Companies = Companies;
module.exports.ProjectComments = ProjectComments;
module.exports.ProjectPeriods = ProjectPeriods;
module.exports.ClientComments = ClientComments;
module.exports.ProjectClient = ProjectClient;
module.exports.ProjectCrew = ProjectCrew;
module.exports.CompanyCrew = CompanyCrew;

function logErrorToConsole(e) {
    console.log(e);
}