/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react/addons");
var bootstrap = require("react-bootstrap");
var Glyphicon = bootstrap.Glyphicon;
var Input = bootstrap.Input;
var Button = bootstrap.Button;
var OverlayMixin = bootstrap.OverlayMixin;
var Modal = bootstrap.Modal;
var Panel = bootstrap.Panel;

var Button = bootstrap.Button;


var Nothing = require("./Nothing.jsx");

var Table = require('reactable').Table;
var Tr = require('reactable').Tr;
var Td = require('reactable').Td;

var moment = require("moment");



var Pagination = React.createClass({

    render: function () {

        var nextButton = _.isEmpty(this.props.next) ? <Nothing/> :(<Button  bsSize='xsmall'  onClick={this.props.next}><Glyphicon glyph='forward' /></Button>)
        var prevButton = _.isEmpty(this.props.prev) ? <Nothing/> :(<Button  bsSize='xsmall'  onClick={this.props.prev}><Glyphicon glyph='backward' /></Button>)


        return (
            <div className="pagination-div">
                  <div className="pagination-prev">
                      {prevButton}
                   </div>
                  <div className="pagination-next">
                      {nextButton}
                  </div>


            </div>);
    }
});

module.exports = Pagination;