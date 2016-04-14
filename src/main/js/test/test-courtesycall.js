var assert = require("assert");
var util = require('util');

var courtesycall = require('../prod/courtesycall');
var courtesyCallList = require('../prod/courtesycall').CourtesyCallList;

describe("courtesycall", function () {
    it("can convert model to project ", function () {
        var t = courtesycall.fromWireFormat({"id":"uiuiuiuiuui","comment":"test",
            "callDate":"23/04/2015",
            "courtesyCallType":"EMAIL",
        	"made":"false","client_id":"232323","displayClient":"test test"});
        assert.equal(t.callDate(), "23/04/2015");
        assert.equal('test', t.comment());
        assert.equal('uiuiuiuiuui', t.id());
        assert.equal('EMAIL', t.callType());
        assert.equal("false", t.made());
        assert.equal('232323', t.clientId());
        assert.equal('test test', t.displayClient());


    });

    it("can convert model to list of projects ", function () {
        var list = courtesyCallList.fromWireFormat([
            {"id":"uiuiuiuiuui","comment":"test",
                "callDate":"23/04/2015",
                "courtesyCallType":"EMAIL",
                "made":"false","client_id":"232323"},
            {"id":"uiuiuiuiuui","comment":"test2",
                "callDate":"23/04/2015",
                "courtesyCallType":"EMAIL",
                "made":"false","client_id":"232323"}]);
        assert.equal(list.courtesycalls().length, 2);

        assert.equal('test', list.courtesycalls()[0].comment());
        assert.equal('test2', list.courtesycalls()[1].comment());
        
        assert.equal('uiuiuiuiuui', list.courtesycalls()[0].id());
        assert.equal('uiuiuiuiuui', list.courtesycalls()[1].id());
        
    });
    
    it("can accept ids", function () {
       var p = courtesycall.fromWireFormat({"id":"uiuiuiuiuui","comment":"test",
           "callDate":"23/04/2015",
           "courtesyCallType":"EMAIL",
           "made":"false","client_id":"232323"});
       p.update("id","id2");
       assert.equal('id2', p.id());
       assert.equal('test', p.comment());

    });
});
