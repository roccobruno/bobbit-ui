var _ = require("lodash");
var moment = require("moment");

var ProjectPeriod = require("./projectperiod.js").ProjectPeriod;
var ProjectPeriodList = require("./projectperiod.js").ProjectPeriodList;
var ProjectCompany = require("./company.js").Company;

var Project = function(id,title,creationTimestamp){
    this._title = title;
    this._creationTimestamp = creationTimestamp;
    this._id = id;

};

var Project = function(id,title){
    this._title = title;
    this._id = id;
};

var Project = function(){
   this._projectPeriods = []
}

var Project = function(id,title,creationTimestamp,type,budget,director,projectPeriods,action,tracking,location,followUp){
    this._title = title;
    this._creationTimestamp = creationTimestamp;
    this._followUp = followUp;
    this._id = id;
    this._type= _.isEmpty(type) ? 'NEW_PROJECT' : type;
    this._budget =  _.isEmpty(budget) ? 'Not specified' : budget;
    this._director = _.isEmpty(director) ? 'Not specified' : director;
    this._projectPeriods =  projectPeriods;
    this._action= _.isEmpty(action) ? 'Not specified' : action;
    this._tracking=  tracking;
    this._location= _.isEmpty(location) ? 'Not specified' : location;
    this._prodCompany = new ProjectCompany();


};

Project.prototype.location = function(){
    return this._location;
};

Project.prototype.followUp = function(){
    return this._followUp;
};

Project.prototype.tracking = function(){
    return this._tracking;
};

Project.prototype.director = function(){
    return this._director;
};

Project.prototype.prodCompany = function(){
    return this._prodCompany;
};

Project.prototype._projectPeriods = function(){
    return this._projectPeriods;
};
Project.prototype.action = function(){
    return this._action;
};

Project.prototype.title = function(){
    return this._title;
};

Project.prototype.id = function(){
    return this._id;
};

Project.prototype.project_type = function(){
    return this._type;
};

Project.prototype.budget = function(){
    return this._budget;
};


Project.prototype.shootDate = function(){

    var shootDate = _.filter(this._projectPeriods, function(period) {

       return period.reason() =='shoot';
    });

    if(shootDate.length>0)
       return shootDate[0]
       else
    return new ProjectPeriod();
};

Project.prototype.prepDate = function(){

    var shootDate = _.filter(this._projectPeriods, function(period) {

       return period.reason() =='preProductionDate';
    });

    if(shootDate.length>0)
       return shootDate[0]
       else
    return new ProjectPeriod();
};

Project.prototype.validate = function(active) {
   var result = []
     if(active) {
         if(_.isEmpty(this._title))
           result.push("title")

     }
      return result

}

Project.prototype.addProdCompany = function(company) {
  this._prodCompany = company;
}

Project.prototype.addCoProdCompany = function(company) {
  this._coProdCompany = company;
}


Project.prototype.addPeriod = function (period) {

   var filtered = _.filter(this._projectPeriods,function(p){
     return p.id()!=period.id();
   })



   if(this._projectPeriods ==null)
        this._projectPeriods = []
   else
        this._projectPeriods = filtered
    return this._projectPeriods.push(period);
};

Project.prototype.emptyPeriods = function () {
        this._projectPeriods = []
};

Project.prototype.projectPeriods = function () {
    return this._projectPeriods;
};


Project.prototype.creationTimestamp = function () {
    return this._creationTimestamp;
};

Project.prototype.creationTimestampInFormat = function (format) {
    return moment.unix(this._creationTimestamp).format(format);
};





Project.fromWireFormat = function(m) {
    return new Project(m.id,m.title, m.creationTimestamp,m.projectType,m.budget,m.director,ProjectPeriodList.fromWireFormat(m.projectPeriods).periods(),m.action,m.tracking,m.location,m.followUp);
};

Project.fromWireFormatForSuggest = function(m) {
    return new Project(m.value,m.label);
};

Project.prototype.update = function(field, value) {

    if(field == 'title') {
        this._title = value;
    }
    if(field == 'id') {
        this._id = value;
    }

      if(field == 'followUp') {
            this._followUp = value;
        }
    
    if(field == 'type') {
        this._type = value;
    }
     if(field == 'location') {
            this._location = value;
        }
         if(field == 'tracking') {
                this._tracking = value;
            }
    if(field == 'budget') {
        this._budget = value;
    }
    if(field == 'genre') {
        this._genre = value;
    }
    if(field == 'storyLine') {
        this._storyLine = value;
    }
     if(field == 'action') {
            this._action = value;
        }
     if(field == 'prodCompany') {
            this._prodCompany = value;
        }
     if(field == 'director') {
            this._director = value;
        }

          if(field == 'periods') {
                    this._periods= value;
                }

};

Project.prototype.toWireFormat = function () {
    return {
       id:this._id,	
       title : this._title,
       creationTimestamp: this._creationTimestamp,
       storyLine:this._storyLine,
       genre:this._genre,
       budget:this._budget,
       projectType:this._type,
       director:this._director,
       tracking:this._tracking,
       location:this._location,
       followUp:this._followUp,
       projectPeriods:[],
    };
};


var ProjectSearchForm = function(title,type,prodCompany,director,shootDateFrom,shootDateTo,prepDateFrom,prepDateTo){
    this._title = title;
    this._type= type;
    this._prodCompany = prodCompany;
    this._director =  director;
    this._shootDateFrom = shootDateFrom;
    this._shootDateTo = shootDateTo;
    this._prepDateFrom = prepDateFrom;
    this._prepDateTo = prepDateTo;
};

ProjectSearchForm.prototype.update = function(field, value) {

    if(field == 'title') {
        this._title = value;
    }
    if(field == 'type') {
        this._type = value;
    }
    if(field == 'director') {
            this._director = value;
    }
     if(field == 'shootDateFrom') {
                this._shootDateFrom = value;
        }
         if(field == 'shootDateTo') {
                    this._shootDateTo = value;
            }
             if(field == 'prepDateFrom') {
                        this._prepDateFrom = value;
                }
                 if(field == 'prepDateTo') {
                            this._prepDateTo = value;
                    }


};

ProjectSearchForm.prototype.shootDateFrom= function() {
 return this._shootDateFrom;
}

ProjectSearchForm.prototype.shootDateTo= function() {
 return this._shootDateTo;
}

ProjectSearchForm.prototype.prepDateFrom= function() {
 return this._prepDateFrom;
}

ProjectSearchForm.prototype.prepDateTo= function() {
 return this._prepDateTo;
}



ProjectSearchForm.prototype.toWireFormat = function () {
    return {
       title : this._title,
       projectType:this._type,
       director:this._director,
       shootDateFrom:this._shootDateFrom,
       shootDateTo:this._shootDateTo,
       preProductionDateFrom:this._prepDateFrom,
       preProductionDateTo:this._prepDateTo
    };
};




var ProjectList = function(list) {
    this._projects = list;
};

ProjectList.prototype.projects = function() {
    return this._projects;
};

ProjectList.fromWireFormat = function (wireFormat) {
   
    return new ProjectList(_.map(wireFormat, Project.fromWireFormat));
};

ProjectList.fromWireFormatForSuggest = function (wireFormat) {
	   
    return new ProjectList(_.map(wireFormat, Project.fromWireFormatForSuggest));
};


module.exports.fromWireFormat = Project.fromWireFormat;
module.exports.Project = Project;
module.exports.ProjectSearchForm = ProjectSearchForm;
module.exports.ProjectList = ProjectList;

