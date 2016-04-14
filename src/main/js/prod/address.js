var _ = require("lodash");

var Address = function(line1,line2,line3,phone,altPhone,mobilePhone,fax,city,country,county,postcode){
    this._line1 = line1;
    this._line2= line2;
    this._line3=line3;
    this._phone=phone;
    this._altPhone=altPhone;
    this._mobilePhone=mobilePhone;
    this._fax= fax;
    this._city = city;
    this._country = country;
    this._county= county;
    this._postcode = postcode;

};

Address.prototype.checkIfEmpty= function(value) {

  if(_.isEmpty(value) || value == null || value == "null") {
     return ' ';
     }
     else return value

}


Address.prototype.display = function() {

       return this.checkIfEmpty(this._line1)+' '+this.checkIfEmpty(this._line2)+' '+this.checkIfEmpty(this._postcode)+' '+this.checkIfEmpty(this._city) +' '+this.checkIfEmpty(this._country)
 
}

Address.prototype.line1 = function(){
    return this._line1;
};

Address.prototype.line2 = function(){
    return this._line2;
};

Address.prototype.line3 = function(){
    return this._line3;
};

Address.prototype.phone = function(){
    return this._phone;
};

Address.prototype.altPhone = function(){
    return this._altPhone;
};

Address.prototype.mobilePhone = function(){
    return this._mobilePhone;
};
Address.prototype.fax = function(){
    return this._fax;
};
Address.prototype.city = function(){
    return this._city;
};

Address.prototype.country = function(){
    return this._country;
};

Address.prototype.county = function(){
    return this._county;
};

Address.prototype.postcode = function(){
    return this._postcode;
};







Address.fromWireFormat = function(m) {
    if(m==null)
    return new Address();
    else
    return new Address(m.line1,m.line2,m.line3,m.phone,m.altPhone,m.mobilePhone,m.fax,m.city,m.country,m.county,m.postcode);
};



Address.prototype.update = function(field, value) {

    if(field == 'line1' || field == 'secLine1') {
        this._line1 = value;
    }
    if(field == 'line2' || field == 'secLine2') {
        this._line2 = value;
    }
    
    if(field == 'line3' || field == 'secLine3') {
        this._line3= value;
    }
    if(field == 'phone' || field == 'secPhone') {
        this._phone = value;
    }
    if(field == 'altPhone' || field == 'secAltPhone') {
        this._altPhone = value;
    }
    if(field == 'mobilePhone' || field == 'secMobilePhone') {
        this._mobilePhone = value;
    }
    if(field == 'fax' || field == 'secFax') {
        this._fax = value;
    }
    if(field == 'city' || field == 'secCity') {
        this._city = value;
    }
    if(field == 'country' || field == 'secCountry') {
        this._country = value;
    }
    if(field == 'county' || field == 'secCounty') {
        this._county = value;
    }
    if(field == 'postcode' || field == 'secPostcode') {
        this._postcode = value;
    }


};

Address.prototype.toWireFormat = function () {
    return {
       line1:this._line1,
       line2:this._line2,
       line3:this._line3,
       phone : this._phone,
       altPhone : this._altPhone,
       mobilePhone : this._mobilePhone,
       city : this._city,
       country : this._country,
       county: this._county,
       postcode:this._postcode
    };
};



module.exports.fromWireFormat = Address.fromWireFormat;
module.exports.Address = Address;


