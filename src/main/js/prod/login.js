var _ = require("lodash");

var Login = function(username,password){
    this._username = username;
    this._password = password;

};

Login.prototype.username = function(){
    return this._username;
};

Login.prototype.password = function(){
    return this._password;
};

Login.prototype.update = function(field, value) {

    if(field == 'username') {
        this._username = value;
    }

    if(field == 'password') {
        this._password = value;
    }

};

Login.prototype.toWireFormat = function () {
    return {
       username:this._username,
       password : this._password,
    };
};

Login.prototype.validate = function(active) {
  var result = []
  if(active) {
      if(_.isEmpty(this._password))
        result.push("password")
        if(_.isEmpty(this._username))
                result.push("username")

  }
   return result
}

module.exports.Login = Login;