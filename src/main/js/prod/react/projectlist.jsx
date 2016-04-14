/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react/addons");
var bootstrap = require("react-bootstrap");
var Glyphicon = bootstrap.Glyphicon;
var Input = bootstrap.Input;
var OverlayMixin = bootstrap.OverlayMixin;
var Modal = bootstrap.Modal;
var Panel = bootstrap.Panel;

var Button = bootstrap.Button;
var ButtonToolbar = bootstrap.ButtonToolbar;
var DeleteButton = require("./component/Buttons.jsx").DeleteButton;

var api = require("../api.js");
var Nothing = require("./component/Nothing.jsx");
var Pagination = require("./component/pagination.jsx");
var EditButton = require("./component/Buttons.jsx").EditButton;
var DateTime = require("./date-time.jsx").DateTime;

var Table = require('reactable').Table;
var Tr = require('reactable').Tr;
var Td = require('reactable').Td;

var moment = require("moment");



var ProjectList = React.createClass({
    propTypes: {
        projects: React.PropTypes.array.isRequired
    },



    getDefaultProps: function() {
        return { filter: function() { return true; }}
    },
    projectsFiltered: function() {
        return _.filter(this.props.projects, this.props.filter);
    },
    deleteProject: function() {
        alert("not yet implemented:")
    },

    handleClick: function(clickedRow){

        var clickableColumnClassNames = ["title","creation-timestamp"];

        if(clickableColumnClassNames.indexOf(clickedRow.target.className)==-1){
            return;
        }

        var aElement = clickedRow.currentTarget.children[1].childNodes[0];

        if(aElement.tagName == "A"){
            window.location.href = aElement.href
        }
    },
    deleteProject:function(id) {
    var that = this
      api.Projects.deleteProject(id,function() {
         that.props.dismiss();

      })


    },


    render: function () {

        var that = this;

        var tableColumns = [

            { label: 'Title', key: 'title' },
            { label: 'Type', key: 'type' },
            { label: 'Director', key: 'director' },
            { label: 'Shoot Date', key: 'shootDate' },
            { label: 'Follow Up Date', key: 'followUp' },
            { label: 'Prep Date', key: 'preProductionDate' },
            { label: 'Action', key: 'action' }
            

        ];

        var projects = this.projectsFiltered();



        var title =
            <div>
              Latest projects
            </div>;

        if (projects.length == 0) {
            return <div>
                <div className="table-header"><div className="table-caption">{title}</div></div>
                <div className="faux-table">No projects here</div>
            </div>;
        }


        var classes = React.addons.classSet({
            'translation-task-summary': true

        });
        var projectColumnsRows = (_.toArray(projects)).map(function(item, index){



            var title = item.title()
            var prodNae = item.prodCompany().name()
            var url = "edit-project.html?projectId="+item.id();
            var nameForEdit = "EDIT"+item.id();
            var nameForDelete = "DELETE"+item.id();
            var deleteButton = that.props.cannotDeleteProject ?  <Nothing/> :  (<DeleteButton action={that.deleteProject} id={item.id()} info={item.title()}/>)
            return (
               <Tr  onClick={that.handleClick}>
                <Td column="title">{item.title()}</Td>
                <Td column="type">{item.project_type()}</Td>
                <Td column="director">{item.director()}</Td>
                <Td className="shootDate" column="shootDate">{item.shootDate().date()}</Td>
                <Td className="preProductionDate" column="followUp">{item.followUp()}</Td>
                <Td className="preProductionDate" column="preProductionDate">{item.prepDate().date()}</Td>
                <Td className="project-action" column="action">
                <ButtonToolbar className="projectlist-buttons">
                  <EditButton link={url}/>
                  { deleteButton}
                </ButtonToolbar>
                </Td>
             
                
            </Tr>);
        });



        return (
            <div className="table-default">
                <div className="table-header"><div className="table-caption">{title}</div></div>
                <Table
                className="table table-striped table-bordered table-condensed table-hover"
                    columns={tableColumns}
                    sortable={[
                                {
                                    column:'preProductionDate',
                                    sortFunction:function(d1,d2){
                                        var dt1 = new Date(moment(d1,'DD/MM/YYYY'));
                                        var dt2 = new Date(moment(d2,'DD/MM/YYYY'));

                                        return dt1.getTime()>dt2.getTime();
                                    }
                                },
                                 {
                                    column:'shootDate',
                                    sortFunction:function(d1,d2){
                                        var dt1 = new Date(moment(d1,'DD/MM/YYYY'));
                                        var dt2 = new Date(moment(d2,'DD/MM/YYYY'));

                                        return dt1.getTime()>dt2.getTime();
                                    }
                                },{
                                                                      column:'followUp',
                                                                      sortFunction:function(d1,d2){
                                                                          var dt1 = new Date(moment(d1,'DD/MM/YYYY'));
                                                                          var dt2 = new Date(moment(d2,'DD/MM/YYYY'));

                                                                          return dt1.getTime()>dt2.getTime();
                                                                      }
                                                                  },'title','type','productionCompany','director']}
                    filterable={['title','preProductionDate','shootDate','followUp','type','director','productionCompany']}>

                    {projectColumnsRows}

                </Table>
                <Pagination next={this.props.next} prev={this.props.prev}/>

            </div>);
    }
});

module.exports = ProjectList;