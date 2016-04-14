var _ = require("lodash");
var moment = require("moment");


var Pagination= function(numTot, list, next,prev) {
  this._numTot = numTot;
  this._list = list;
  this._next = next;
  this._prev = prev;
}



Pagination.prototype.numTot = function(){
    return this._numTot;
};

Pagination.prototype.list = function(convertion){
    return convertion(this._list);
};

Pagination.prototype.next = function(){
    return this._next;
};

Pagination.prototype.prev = function(){
    return this._prev;
};

Pagination.fromWireFormat = function(m) {
    return new Pagination(m.numOfRecords,m.options,
        m.nextPage,m.prevPage);
};

module.exports.Pagination = Pagination;