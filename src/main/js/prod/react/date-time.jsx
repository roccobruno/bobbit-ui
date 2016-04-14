/** @jsx React.DOM */
var React = require("react/addons");
var moment = require("moment");

var DateTime = React.createClass({
    propTypes: {
        dateOrTime: React.PropTypes.number.isRequired
    },
    getInitialState: function () {
        return {
            format: this.props.format ? this.props.format : 'default'
        };
    },
    render: function () {
        var creationTimestamp = moment.unix(this.props.dateOrTime).format(this.state.format);
        return this.transferPropsTo(
            <span>{creationTimestamp}</span>
        );
    }
});

module.exports.DateTime = DateTime;