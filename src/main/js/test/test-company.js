var assert = require("assert");
var util = require('util');

var client = require('../prod/client');
var clientList = require('../prod/client').ClientList;

describe("client", function () {
    it("can convert model to client ", function () {
        var tt = client.fromWireFormat({"id":"uiuiuiuiuui",
            "name":"test",
            "address":{
                "line1":"line1",
                "line2":"line2",
                "line3":"line3",
                "phone":"phone",
                "altPhone":"altPhone",
                "mobilePhone":"mobilePhone",
                "fax":"fax",
                "city":"city",
                "country":"country",
                "county":"county",
                "postcode":"postcode"

            }});
        assert.equal('test', tt.name());
        assert.equal('line1', tt.address().line1());
        assert.equal('line2', tt.address().line2());
        assert.equal('line3', tt.address().line3());
        assert.equal('phone', tt.address().phone());
        assert.equal('altPhone', tt.address().altPhone());
        assert.equal('mobilePhone', tt.address().mobilePhone());
        assert.equal('fax', tt.address().fax());
        assert.equal('city', tt.address().city());
        assert.equal('country', tt.address().country());
        assert.equal('county', tt.address().county());
        assert.equal('postcode', tt.address().postcode());

    });

    it("can convert model to list of projects ", function () {
        var list = clientList.fromWireFormat([
            {"id":"uiuiuiuiuui","name":"test",
                "address":{
                    "line1":"line1",
                    "line2":"line2",
                    "line3":"line3",
                    "phone":"phone",
                    "altPhone":"altPhone",
                    "mobilePhone":"mobilePhone",
                    "fax":"fax",
                    "city":"city",
                    "country":"country",
                    "county":"county",
                    "postcode":"postcode"

                }},
            {"id":"uiuiuiuiuui2","name":"test2",
                "address":{
                    "line1":"line1",
                    "line2":"line2",
                    "line3":"line3",
                    "phone":"phone",
                    "altPhone":"altPhone",
                    "mobilePhone":"mobilePhone",
                    "fax":"fax",
                    "city":"city",
                    "country":"country",
                    "county":"county",
                    "postcode":"postcode"

                }}]);
        assert.equal(list.clients().length, 2);

        assert.equal('test', list.clients()[0].name());
        assert.equal('test2', list.clients()[1].name());

        assert.equal('uiuiuiuiuui', list.clients()[0].id());
        assert.equal('uiuiuiuiuui2', list.clients()[1].id());


    });
    
    it("can accept ids", function () {
       var p = client.fromWireFormatForSuggest({"id":"uiuiuiuiuui","name":"test"});
       p.update("id","id2");
       p.update("name","id2");
       assert.equal('id2', p.id());
       assert.equal('id2', p.name());

    });


});
