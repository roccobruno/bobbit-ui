
var ajax = require("./ajax.js");

var Project = require("./project.js").Project;
var Client = require("./client.js").Client;
var ClientList = require("./client.js").ClientList;
var ProjectList = require("./project.js").ProjectList;
var Pagination = require("./pagination.js").Pagination;
var ProjectPeriodList = require("./projectperiod.js").ProjectPeriodList;
var ProjectDocumentList = require("./projectdocument.js").ProjectDocumentList;


var Projects = function() {};

Projects.prototype.sendProject = function(project,callbackSuccess,callbackFailed) {
    ajax.put("/api/project",project.toWireFormat(),callbackSuccess,callbackFailed);
};

Projects.prototype.deleteProject = function(projectId,callbackSuccess) {
    ajax.del("/api/project/"+projectId,callbackSuccess);
};

Projects.prototype.completeProject = function(project,callbackSuccess,callbackFailed) {
    ajax.post("/api/project",project.toWireFormat(),callbackSuccess,callbackFailed);
};

Projects.prototype.loadSuggestions = function(input,callback){

    var input = input.length<2 ? 'xxxx': input;
    ajax.get("/api/project/suggest?projectBusqueda="+input+"&pageNumber=1&pageSize=10",function (json) {
        return callback(null,json);
    });
};

Projects.prototype.findAll = function(callback) {
    ajax.get("/api/project/", function (json) {
        callback(ProjectList.fromWireFormat(json));
    });

};

Projects.prototype.find = function(id,callback) {
    ajax.get("/api/project/"+id, function (json) {
        callback(Project.fromWireFormat(json));
    });
};

Projects.prototype.findClients = function(id,callback) {
    ajax.get("/api/client/project/"+id, function (json) {
        callback(ClientList.fromWireFormat(json));
    });
};

Projects.prototype.findPeriods = function(ids,callback) {
    ajax.get("/api/projectperiod/projects?ids="+ids, function (json) {
        callback(ProjectPeriodList.fromWireFormat(json));
    });
};


Projects.prototype.search = function(searchForm,pageNumber,callback) {
    ajax.get("/api/project/search?projectBusqueda="+searchForm+"&pageNumber="+pageNumber+"&pageSize=100", function (json) {
        callback(Pagination.fromWireFormat(json));
    })

};

Projects.prototype.searchNoParam = function(search,pageNumber,callback) {
    ajax.get("/api/project/search?projectBusqueda="+search, function (json) {
        callback(Pagination.fromWireFormat(json));
    })

};

Projects.prototype.uuid = function(callback) {
    ajax.get("/uuid/", function (json) {
        return callback(json.uuid);
    });
}

Projects.prototype.findDocuments = function(id,callback) {
    ajax.get("/api/projectdocument/project/"+id, function (json) {
        callback(ProjectDocumentList.fromWireFormat(json));
    });

};

module.exports = new Projects();
