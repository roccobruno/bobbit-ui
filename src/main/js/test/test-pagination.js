var assert = require("assert");
var util = require('util');

var project = require('../prod/project');
var pagination = require('../prod/pagination').Pagination;
var projectList = require('../prod/project').ProjectList;
var ProjectForm = require('../prod/project').Project;
var ProjectPeriod = require('../prod/projectperiod').ProjectPeriod;

describe("pagination", function () {
    it("can convert model to project ", function () {
        var t = pagination.fromWireFormat({"prevPage":"test","nextPage":"test","numOfRecords":20,"options":[{"id":"uiuiuiuiuui","title":"test",
            "creationTimestamp":1417690777,
            "projectType":"movie",
        	"budget":"200K","genre":"ACTION","storyLine":"cdsds",
        	"director":"tom",
        	"productionCompany":{
        	   "name":"Warner Bros",
        	   "id" : "dsdsdsdsd"
        	},
        	"coproductionCompany":{
                    	   "name":"Warner Bros",
                    	   "id" : "dsdsdsdsd"
                    	},
        	"action":"action",
        	"projectPeriods":[
        	   {
        	     "id":"121212",
        	     "date":"23-03-2015",
        	     "reason":"Shoot",
        	     "duration":2

        	   }

        	]}]});
        assert.equal(t.numTot(), 20);
        assert.equal(t.next(), "test");
        assert.equal(t.prev(), "test");
        var projects = t.list(projectList.fromWireFormat)
        assert.equal(projects.projects().length, 1);
        assert.equal('test', projects.projects()[0].title());
        assert.equal('uiuiuiuiuui', projects.projects()[0].id());


    });


});
