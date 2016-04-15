var assert = require("assert");
var util = require('util');

var project = require('../prod/project');
var projectList = require('../prod/project').ProjectList;
var ProjectForm = require('../prod/project').Project;
var ProjectPeriod = require('../prod/projectperiod').ProjectPeriod;

describe("project", function () {
    it("can convert model to project ", function () {
        var t = project.fromWireFormat({"id":"uiuiuiuiuui","title":"test",
            "creationTimestamp":1417690777,
            "projectType":"movie",
        	"budget":"200K",
        	"director":"tom",
            "tracking" : "ACTIVE",
            "location" : "London",
        	"action":"action",
        	"projectPeriods":[
        	   {
        	     "id":"121212",
        	     "date":"23-03-2015",
        	     "reason":"Shoot",
        	     "duration":2

        	   }

        	]});
        assert.equal(t.creationTimestamp(), 1417690777);
        assert.equal('test', t.title());
        assert.equal('uiuiuiuiuui', t.id());
        assert.equal('movie', t.project_type());
        assert.equal('200K', t.budget());
        assert.equal('tom', t.director());
        assert.equal('London', t.location());
        assert.equal('ACTIVE', t.tracking());
        assert.equal('action', t.action());

        assert.equal(t.creationTimestampInFormat("ddd DD MMM YYYY h:mm:ss"), "Thu 04 Dec 2014 10:59:37");

    });

    it("can convert model to list of projects ", function () {
        var list = projectList.fromWireFormat([{"id":"uiuiuiuiuui","title":"test", "creationTimestamp":1417690777},{"id":"uiuiuiuiuui","title":"test2", "creationTimestamp":1417690777}]);
        assert.equal(list.projects().length, 2);

        assert.equal('test', list.projects()[0].title());
        assert.equal('test2', list.projects()[1].title());
        
        assert.equal('uiuiuiuiuui', list.projects()[0].id());
        assert.equal('uiuiuiuiuui', list.projects()[1].id());
        
        assert.equal(list.projects()[0].creationTimestampInFormat("ddd DD MMM YYYY h:mm:ss"), "Thu 04 Dec 2014 10:59:37");
        assert.equal(list.projects()[1].creationTimestampInFormat("ddd DD MMM YYYY h:mm:ss"), "Thu 04 Dec 2014 10:59:37");

    });
    
    it("can accept ids", function () {
       var p = project.fromWireFormat({"id":"uiuiuiuiuui","title":"test", "creationTimestamp":1417690777});
       p.update("id","id2");
       assert.equal('id2', p.id());
       assert.equal('test', p.title());	

    });

//        it("can accept Period", function () {
//           var p = new ProjectForm();
//           p.addPeriod(new ProjectPeriod("2323","23-02-2015","22-02-2015","shoot","3"));
//           assert.equal('2323', p.projectPeriods()[0].id());
//           assert.equal('22-02-2015', p.projectPeriods()[0].endDate());
//           assert.equal('23-02-2015', p.projectPeriods()[0].date());
//           assert.equal('shoot', p.projectPeriods()[0].reason());
//
//        });

           it("can validate itself ", function () {
                var p = project.fromWireFormat({"id":"uiuiuiuiuui","title":"", "creationTimestamp":1417690777});
                var val = p.validate(true)
                assert.equal(val.length,1);



              var p3 = project.fromWireFormat({"id":"uiuiuiuiuui","title":"test", "creationTimestamp":1417690777});
                           var val3 = p3.validate(true)
                           assert.equal(val3.length,0);
             });
});
