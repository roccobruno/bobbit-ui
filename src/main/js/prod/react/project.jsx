/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react/addons");
var bootstrap = require("react-bootstrap");
var Glyphicon = bootstrap.Glyphicon;
var Input = bootstrap.Input;
var Button = bootstrap.Button;
var ButtonInput = bootstrap.ButtonInput;
var OverlayMixin = bootstrap.OverlayMixin;
var Modal = bootstrap.Modal;
var Grid = bootstrap.Grid;
var Row = bootstrap.Row;
var Table = bootstrap.Table;
var Col = bootstrap.Col;
var Panel = bootstrap.Panel;
var Tooltip = bootstrap.Tooltip;
var OverlayTrigger = bootstrap.OverlayTrigger;
var ProgressBar = bootstrap.ProgressBar;
var ProjectForm = require("../project.js").Project;
var ProjectListObj = require("../project.js").ProjectList;
var ProjectSearchForm = require("../project.js").ProjectSearchForm;
var ProjectList = require('./projectlist.jsx');
var Modal = bootstrap.Modal;
var api = require("../api.js");
var Select = require('react-select');

var Accordion = bootstrap.Accordion;
var DatePicker = require('react-date-picker');




var CasaproApplication = require("./CasaproApplication.jsx");


var Nothing = require("./component/Nothing.jsx");


var Project = React.createClass({


    closeModal: function () {
        this.setState({formOpen: false,formCommentOpen:false,
           project:new ProjectForm(),
            showError : false,
            showMsg: false,
            showBar:false
            });
    },

    propTypes: {

    },
    componentDidMount: function () {
        this.loadProjects();
    },
    loadProjects: function() {
        var that = this;
         api.Projects.findAll(function (list) {
                that.setState({
                    projects: list.projects()
                });
                 if(!_.isEmpty(list.projects()))
                 that.loadProjectPeriods(list.projects());
                });
    },

    getInitialState: function() {


        return {projects:[],
            project:new ProjectForm(),
            projectSearchForm:new ProjectSearchForm(),
            showError : false,
            showMsg: false,
            showBar:false,
            formOpen:false}
    },
    handleChange: function(event) {
        var validationResult = this.state.project.validate(true)
        this.setState({validationResult:validationResult})
        var projectToUpdate = this.state.project;
        projectToUpdate.update(event.target.name,event.target.value);
        this.setState({project:projectToUpdate});
    },
    sendProject: function(e) {
    e.preventDefault();
    var validationResult = this.state.project.validate(true)
       this.setState({validationResult:validationResult})
       if(validationResult.length==0) {
        this.state.project.update('id',this.state.uuid);
        api.Projects.sendProject(this.state.project,this.handleApiResponseOk,this.handleApiResponseKo);
        }
    },
      getClasses: function(field) {
            var validationResult = this.state.validationResult
            return React.addons.classSet({
              'form-group': true,
              'has-error': _.contains(validationResult,field)
            });
          },
    handleApiResponseOk:function() {
        window.location = "edit-project.html?projectId="+this.state.uuid;
        
    },
    handleApiResponseKo:function() {
        this.setState({showError:true,showBar:false});
    },
    openForm:function() {
        api.Projects.uuid(this.openFormState)
    },
    openFormState : function(uuid) {
      this.setState({formOpen:true,uuid:uuid});
    },
    openCommentFormState : function(uuid) {
      this.setState({formCommentOpen:true,uuid:uuid});
    },
    logChange:function(val) {
    },
    getOptions: function(input,callback) {
      api.Projects.loadSuggestions(input,callback)
    
    },
    
    goToProject: function(val) {
    if(!_.isEmpty(val))
      window.location = "edit-project.html?projectId="+val;
    
    },
     onDatePickerChangeShootDateFrom : function(date) {
            var projectSearchForm = this.state.projectSearchForm;
            projectSearchForm.update("shootDateFrom",date);
            this.setState({projectSearchForm:projectSearchForm,displayDatePickerShootDateFrom:false});
        },
    openDatePickerShootDateFrom: function() {
        this.setState({displayDatePickerShootDateFrom:true});
    },

         onDatePickerChangeShootDateTo : function(date) {
                var projectSearchForm = this.state.projectSearchForm;
                projectSearchForm.update("shootDateTo",date);
                this.setState({projectSearchForm:projectSearchForm,displayDatePickerShootDateTo:false});
            },
        openDatePickerShootDateTo: function() {
            this.setState({displayDatePickerShootDateTo:true});
        },

             onDatePickerChangePrepDateFrom : function(date) {
                    var projectSearchForm = this.state.projectSearchForm;
                    projectSearchForm.update("prepDateFrom",date);
                    this.setState({projectSearchForm:projectSearchForm,displayDatePickerPrepDateFrom:false});
                },
            openDatePickerPrepDateFrom: function() {
                this.setState({displayDatePickerPrepDateFrom:true});
            },

                 onDatePickerChangePrepDateTo : function(date) {
                        var projectSearchForm = this.state.projectSearchForm;
                        projectSearchForm.update("prepDateTo",date);
                        this.setState({projectSearchForm:projectSearchForm,displayDatePickerPrepDateTo:false});
                    },
                openDatePickerPrepDateTo: function() {
                    this.setState({displayDatePickerPrepDateTo:true});
                },


    onRenderDay:function(props) {
        if (props.date.isBefore('2010-01-01')){
            props.className += ' invalid'
        }


        return props
    },
    handleChangeSearch: function(event) {
          var projectSearchForm = this.state.projectSearchForm;
          projectSearchForm.update(event.target.name,event.target.value);
          this.setState({projectSearchForm:projectSearchForm});
    },
    searchProjects: function() {
       var searchForm = this.state.projectSearchForm;
       var that = this;
       api.Projects.search(JSON.stringify(searchForm.toWireFormat()),1 ,
       function (pagination) {
           var projects = pagination.list(ProjectListObj.fromWireFormat).projects()
           that.setState({projects: projects,next:pagination.next(),prev:pagination.prev()});
           that.loadProjectPeriods(projects)})

    },
    loadNextProjects: function() {
     var that = this;
     api.Projects.searchNoParam(this.state.next,1 ,
            function (pagination) {
                var projects = pagination.list(ProjectListObj.fromWireFormat).projects()
                that.setState({projects: projects,next:pagination.next(),prev:pagination.prev()});
                that.loadProjectPeriods(projects)})
    },
    loadPrevProjects: function() {
     var that = this;
         api.Projects.searchNoParam(this.state.prev,1 ,
                function (pagination) {
                    var projects = pagination.list(ProjectListObj.fromWireFormat).projects()
                    that.setState({projects: projects,next:pagination.next(),prev:pagination.prev()});
                    that.loadProjectPeriods(projects)})
        },
    loadProjectPeriods: function(projects) {

     var ids =  _.map(projects, function(p) {
          return p.id()
         }).reduce(function(res,p) {
           return ""+res+","+p
         });

     var that = this;
     api.Projects.findPeriods(ids,function(res){
         that.updateProjectsWithPeriods(res)

     })

    },
    updateProjectsWithPeriods: function(periods) {
        var projects = this.state.projects
        _.map(projects, function(p) {
            var periodsForProject = _.filter(periods.periods(),function(per){
              return per.projectId() == p.id();
            }).forEach(function(singlePeriod){
              p.addPeriod(singlePeriod);
            });

        });

        this.setState({projects:projects})

    },



    render: function () {


        var showError = this.state.showError? (<div className="email-form-error">There seems to be a problem. Please try again later</div>) :  <Nothing/>;
        var showMsg = this.state.showMsg? (<div className="email-form-msg">Project Sent</div>) :  <Nothing/>;
        var progress = this.state.showBar ? <ProgressBar active now={100} /> : <Nothing/>;
        var projectFormOpen = this.state.formOpen ? (<Modal onRequestHide={this.closeModal}>
            <Panel  header="Create Project" ><form onSubmit={this.sendProject}>
            <div className={this.getClasses('title')}>

                <Input name="title" type="text" label='Title' onChange={this.handleChange} className="project-title" />
               </div> <div className="project-form-button">
                                {progress}
                    <Button  bsStyle="success" className="submit" type="submit">Send Project</Button>
                    <Button  onClick={this.closeModal} >Cancel</Button>
                </div>
                </form>
            </Panel>
                         {showError}
                            {showMsg}
        </Modal>) : <Nothing/>;

        var nextProjects = _.isEmpty(this.state.next) ? "" : this.loadNextProjects
        var prevProjects = _.isEmpty(this.state.prev) ? "" : this.loadPrevProjects

        var datePickerShootDateFrom = this.state.displayDatePickerShootDateFrom ?
            (<div className="courtesycall-form-date-picker"><DatePicker dateFormat="DD/MM/YYYY" locale="en"  onChange={this.onDatePickerChangeShootDateFrom}  onRenderDay={this.onRenderDay} /></div>) : <Nothing/>;

        var datePickerShootDateTo = this.state.displayDatePickerShootDateTo ?
                    (<div className="courtesycall-form-date-picker"><DatePicker  dateFormat="DD/MM/YYYY" locale="en"  onChange={this.onDatePickerChangeShootDateTo}  onRenderDay={this.onRenderDay} /></div>) : <Nothing/>;

        var datePickerPrepDateFrom = this.state.displayDatePickerPrepDateFrom ?
            (<div className="courtesycall-form-date-picker"><DatePicker dateFormat="DD/MM/YYYY" locale="en"  onChange={this.onDatePickerChangePrepDateFrom}  onRenderDay={this.onRenderDay} /></div>) : <Nothing/>;

        var datePickerPrepDateTo = this.state.displayDatePickerPrepDateTo ?
            (<div className="courtesycall-form-date-picker"><DatePicker dateFormat="DD/MM/YYYY" locale="en"  onChange={this.onDatePickerChangePrepDateTo}  onRenderDay={this.onRenderDay} /></div>) : <Nothing/>;

       
        
        return (
                <div className="modal-body">
	                   <div className="search-create-project"> 
			                   <div className="project-autosuggest">
							           <Select
							    name="form-field-name"
							    value="search by project title"
							    asyncOptions={this.getOptions}
							    onChange={this.goToProject}
							  /></div>
							    <div className="create-project-button">
			                    {projectFormOpen}
			                    <Button tabIndex={-1} className="project-button" bsSize="small" onClick={this.openForm} >
			                        Create Project
			                    </Button>
			                    </div>
	                   </div>
	                    <div className="search-projects">
                             <Accordion>
                                     <Panel header='Advanced Search' eventKey='1'>
                                        <Grid>
                                            <Row className='show-grid'>
                                                 <Col md={6} >
                                                         <Input name="title" className="search-client-title" type="text" label='Title'  onChange={this.handleChangeSearch} />
                                                       
                                                 </Col>
                                                 <Col md={6}>
                                                          <Input  name="type" type="select" label='Type' onChange={this.handleChangeSearch}>
                                                            <option value=""></option>
                                                            <option value="TV">TV</option>
                                                            <option value="FILM">FILM</option>
                                                            <option value="LOW_BUDGET">LOW BUDGET</option>
                                                            <option value="DOCUMENTARY">DOCUMENTARY</option>
                                                            <option value="COMMERCIAL">COMMERCIAL</option>
                                                            <option value="OTHER">OTHER</option>
                                                          </Input>
                                                     
                                                 </Col>
                                            </Row>
                                        </Grid>


                                       <Button tabIndex={-1} className="client-button" bsSize="small" onClick={this.searchProjects} >
                                        Search
                                       </Button>

                                     </Panel>

                             </Accordion>




                       	 </div>


	                    <div>
	                       <ProjectList next={nextProjects} prev={prevProjects} projects={this.state.projects} dismiss={this.loadProjects}/>
	                    </div>
                
                </div>

            )
    }

});


function render(e) {
    var application =
        <CasaproApplication>
            <Project/>
        </CasaproApplication>;

    React.render(application, e);
}

module.exports.render = render;
