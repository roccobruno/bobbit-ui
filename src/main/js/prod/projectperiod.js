var _ = require("lodash");

var ProjectPeriod = function(id,date,endDate,reason,duration,projectId) {
    this._id = id;
    this._date = date;
    this._endDate = endDate;
    this._reason = reason;
    this._duration = duration;
    this._projectId =projectId;
}

ProjectPeriod.prototype.id= function() {
  return this._id;
}

ProjectPeriod.prototype.date= function() {
  return this._date;
}
ProjectPeriod.prototype.endDate= function() {
  return this._endDate;
}


ProjectPeriod.prototype.projectId= function() {
  return this._projectId;
}

ProjectPeriod.prototype.reason= function() {
  return this._reason;
}

ProjectPeriod.prototype.reasonLabel= function() {
  if(this._reason == 'preProductionDate')
  return 'Pre Production'

  if(this._reason == 'prePreparationDate')
    return 'Pre Preparation'

     if(this._reason == 'postProductionDate')
        return 'Post Production'


        if(this._reason == 'wrapDate')
                return 'Wrap'

                if(this._reason == 'shoot')
                                return 'Shoot'

  return this._reason;
}

ProjectPeriod.prototype.duration= function() {
  return this._duration;
}

ProjectPeriod.fromWireFormat = function(m) {
          if(m==null)
          return new ProjectPeriod();
          else
          return new ProjectPeriod(m.id,m.date,m.endDate,m.reason,m.duration,m.project_id);
};

ProjectPeriod.prototype.update = function(field, value) {

    if(field == 'date') {
        this._date = value;
    }

    if(field == 'endDate') {
            this._endDate = value;
        }
    if(field == 'reason') {
        this._reason = value;
    }

    if(field == 'duration') {
        this._duration= _.parseInt(value);
    }
      if(field == 'projectId') {
          this._projectId= value;
      }

      if(field == 'id') {
          this._id= value;
      }
};

ProjectPeriod.prototype.toWireFormat = function () {
    return {
       project_id:this._projectId,
       date:this._date,
       endDate:this._endDate,
       reason:this._reason,
       duration:this._duration,
       id:this._id
    };
};

var ProjectPeriodList = function(list) {
    this._periods = list;
};

ProjectPeriodList.prototype.periods = function() {
    return this._periods;
};

ProjectPeriodList.fromWireFormat = function (wireFormat) {

    return new ProjectPeriodList(_.map(wireFormat, ProjectPeriod.fromWireFormat));
};

ProjectPeriodList.toWireFormat = function (periodsObjs) {

    return (_.map(periodsObjs, ProjectPeriod.toWireFormat));
};




module.exports.fromWireFormat = ProjectPeriod.fromWireFormat;
module.exports.ProjectPeriod = ProjectPeriod;
module.exports.ProjectPeriodList = ProjectPeriodList;


