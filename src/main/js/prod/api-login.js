var ajax = require("./ajax.js");


var Login = require("./login.js").Login;


Login.prototype.login = function(login,callbackSuccess,callbackFailed) {

    ajax.post("/api/login/",login.toWireFormat(),callbackSuccess,callbackFailed);

};

Login.prototype.checksession = function() {
    ajax.get("/api/checksession/",function(){

        window.location='login.html';
    });

};

module.exports = new Login();