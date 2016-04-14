var assert = require("assert");
var util = require('util');

var client = require('../prod/client');
var clientList = require('../prod/client').ClientList;

describe("client", function () {
    it("can convert model to client ", function () {
        var tt = client.fromWireFormat({"id":"uiuiuiuiuui",
            "name":"test",
            "companyId":"companyId",
            "email":"email@com",
            "homePhone":"email@com",
            "website":"website",
            "contact":"contact",
            "skype":"skype",
            "miscNotes":"miscNotes",
        	"profesion":"profession",
            "creationTimestamp":1417690777,
            "company":{
                       "name":"Warner Bros",
                       "id" : "dsdsdsdsd"
                    },
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

            },
            "accountDetails":{
                            "ltdName":"ltdName",
                            "nin":"nin",
                            "scheduleDNumber":"scheduleDNumber",
                            "vat":"vat",
                            "bank":"bank",
                            "accountNumber":"accountNumber",
                            "sortCode":"sortCode",
                            "iban":"iban",
                            "accountant":"accountant"
                        },

             "personalDetails":{
                                        "dob":"dob",
                                        "nationality":"nationality",
                                        "usVisa":"usVisa",
                                        "passportNumber":"passportNumber",
                                        "canBeBasedIn":"canBeBasedIn",
                                        "languages":"languages",
                                        "nextOfKin":"nextOfKin",
                                        "partnerName":"partnerName",
                                        "children":"children"
                                    },

          "vehicleDetails":{
                                     "makeModel":"makeModel",
                                     "registrationNumber":"registrationNumber",
                                     "unionGuild":"unionGuild",
                                     "contractRequests":"contractRequests"
                                 },

             "secAddress":{
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
        assert.equal('Warner Bros', tt.company().name());
        assert.equal('uiuiuiuiuui', tt.id());
        assert.equal('email@com', tt.email());
        assert.equal('email@com', tt.homePhone());
        assert.equal('website', tt.website());
        assert.equal('skype', tt.skype());
        assert.equal('miscNotes', tt.miscNotes());
        assert.equal('contact', tt.contact());
        assert.equal('profession', tt.profession());
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

        assert.equal('ltdName', tt.accountDetails().ltdName());
        assert.equal('nin', tt.accountDetails().nin());
        assert.equal('scheduleDNumber', tt.accountDetails().scheduleDNumber());
        assert.equal('vat', tt.accountDetails().vat());
        assert.equal('bank', tt.accountDetails().bank());
        assert.equal('accountNumber', tt.accountDetails().accountNumber());
        assert.equal('sortCode', tt.accountDetails().sortCode());
        assert.equal('iban', tt.accountDetails().iban());
        assert.equal('accountant', tt.accountDetails().accountant());

        assert.equal('dob', tt.personalDetails().dob());
        assert.equal('nationality', tt.personalDetails().nationality());
        assert.equal('usVisa', tt.personalDetails().usVisa());
        assert.equal('passportNumber', tt.personalDetails().passportNumber());
        assert.equal('canBeBasedIn', tt.personalDetails().canBeBasedIn());
        assert.equal('languages', tt.personalDetails().languages());
        assert.equal('nextOfKin', tt.personalDetails().nextOfKin());
        assert.equal('partnerName', tt.personalDetails().partnerName());
        assert.equal('children', tt.personalDetails().children());

        assert.equal('makeModel', tt.vehicleDetails().makeModel());
        assert.equal('registrationNumber', tt.vehicleDetails().registrationNumber());
        assert.equal('unionGuild', tt.vehicleDetails().unionGuild());
        assert.equal('contractRequests', tt.vehicleDetails().contractRequests());

        assert.equal('line1', tt.secAddress().line1());
                assert.equal('line2', tt.secAddress().line2());
                assert.equal('line3', tt.secAddress().line3());
                assert.equal('phone', tt.secAddress().phone());
                assert.equal('altPhone', tt.secAddress().altPhone());
                assert.equal('mobilePhone', tt.secAddress().mobilePhone());
                assert.equal('fax', tt.secAddress().fax());
                assert.equal('city', tt.secAddress().city());
                assert.equal('country', tt.secAddress().country());
                assert.equal('county', tt.secAddress().county());
                assert.equal('postcode', tt.secAddress().postcode());

        assert.equal(tt.creationTimestamp(), 1417690777);

        assert.equal(tt.creationTimestampInFormat("ddd DD MMM YYYY h:mm:ss"), "Thu 04 Dec 2014 10:59:37");

    });

    it("can convert model to list of projects ", function () {
        var list = clientList.fromWireFormat([
            {"id":"uiuiuiuiuui","name":"test",
            "companyId":"companyId" ,
                "email":"email@com",
                "homePhone":"email@com",
                "website":"website",
                "contact":"contact",
                "profesion":"profession",
                "creationTimestamp":1417690777,
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
            "companyId":"companyId",
                "email":"email@com",
                "homePhone":"email@com",
                "website":"website",
                "contact":"contact",
                "profesion":"profession",
                "creationTimestamp":1417690777,
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
        
        assert.equal(list.clients()[0].creationTimestampInFormat("ddd DD MMM YYYY h:mm:ss"), "Thu 04 Dec 2014 10:59:37");
        assert.equal(list.clients()[1].creationTimestampInFormat("ddd DD MMM YYYY h:mm:ss"), "Thu 04 Dec 2014 10:59:37");

    });
    
    it("can accept ids", function () {
       var p = client.fromWireFormatForSuggest({"id":"uiuiuiuiuui","name":"test"});
       p.update("id","id2");
       p.update("name","id2");
       assert.equal('id2', p.id());
       assert.equal('id2', p.name());

    });

      it("can validate itself ", function () {
           var p = client.fromWireFormatForSuggest({"id":"uiuiuiuiuui","name":""});
           var val = p.validate(true)
           assert.equal(val.length,1);

           var p2 = client.fromWireFormatForSuggest({"id":"uiuiuiuiuui","name":""});
                      var val2 = p2.validate(true)
                      assert.equal(val2.length,1);

         var p3 = client.fromWireFormatForSuggest({"id":"uiuiuiuiuui","name":"dsdsds"});
                      var val3 = p3.validate(true)
                      assert.equal(val3.length,0);
        });
});
