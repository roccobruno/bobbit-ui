var assert = require("assert");
var util = require('util');

var clientdocument = require('../prod/clientdocument');
var clientdocumentList = require('../prod/clientdocument').ClientDocumentList;

describe("clientdocument", function () {
    it("can convert model to clientdocument ", function () {
        var tt = clientdocument.fromWireFormat({"id":"uiuiuiuiuui",
            "clientId":"clientId",
            "documentMetadata":{
                "fileName":"fileName",
                "description":"description",
                "fechaCreacion":"23-03-2015"
            }});
        assert.equal('clientId', tt.clientId());
        assert.equal('uiuiuiuiuui', tt.id());
        assert.equal('fileName', tt.documentMetadata().fileName());
        assert.equal('description', tt.documentMetadata().description());
        assert.equal("23-03-2015", tt.documentMetadata().creationTimestamp());

    });

    it("can convert model to list of projects ", function () {
        var list = clientdocumentList.fromWireFormat([
            {"id":"uiuiuiuiuui",
                        "clientId":"clientId",
                        "documentMetadata":{
                            "fileName":"fileName",
                            "description":"description",
                            "fechaCreacion":"23-03-2015"

                        }},
           {"id":"uiuiuiuiuui1",
                       "clientId":"clientId1",
                       "documentMetadata":{
                           "fileName":"fileName1",
                           "description":"description1",
                           "fechaCreacion":"23-03-2015"

                       }}]);
        assert.equal(list.clientdocuments().length, 2);

         assert.equal('clientId', list.clientdocuments()[0].clientId());
         assert.equal('clientId1', list.clientdocuments()[1].clientId());
              assert.equal('uiuiuiuiuui', list.clientdocuments()[0].id());
              assert.equal('uiuiuiuiuui1', list.clientdocuments()[1].id());
              assert.equal('fileName', list.clientdocuments()[0].documentMetadata().fileName());
              assert.equal('fileName1', list.clientdocuments()[1].documentMetadata().fileName());
              assert.equal('description', list.clientdocuments()[0].documentMetadata().description());
              assert.equal('description1', list.clientdocuments()[1].documentMetadata().description());
              assert.equal("23-03-2015", list.clientdocuments()[0].documentMetadata().creationTimestamp());
              assert.equal("23-03-2015", list.clientdocuments()[1].documentMetadata().creationTimestamp());
    });
    
    it("can accept ids", function () {
      var p = clientdocument.fromWireFormat({"id":"uiuiuiuiuui",
                  "clientId":"clientId",
                  "documentMetadata":{
                      "fileName":"fileName",
                      "description":"description",
                      "fechaCreacion":"23-03-2015"

                  }});
       p.update("id","id2");
       p.update("fileName","id2");
       assert.equal('id2', p.id());
       assert.equal('id2', p.documentMetadata().fileName());

    });
});
