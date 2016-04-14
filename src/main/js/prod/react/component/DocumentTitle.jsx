/** @jsx React.DOM */

/* modified version of http://stackoverflow.com/questions/26266675/how-do-i-keep-document-title-updated-in-react-app */
var React = require("react");
var Children = React.Children;
var _ = require("lodash");

var DocumentTitle = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },

    statics: {
        stack: [],

        reset: function() {
            DocumentTitle.stack = [];
        },

        getActiveInstance: function () {
            var length = DocumentTitle.stack.length;
            if (length > 0) {
                return DocumentTitle.stack[length - 1];
            }
        },

        wholeDocumentTitle: function() {
            return _.map(DocumentTitle.stack, function(m) { return m.getTitle() }).join(" - ");
        },

        updateDocumentTitle: function () {
            var activeInstance = DocumentTitle.getActiveInstance();
            if (activeInstance) {
                document.title = this.wholeDocumentTitle();
            }
        }
    },
    getDefaultProps: function () {
        return {
            title: ''
        };
    },

    getTitle: function() {
        return this.props.title;
    },

    isActive: function () {
        return this === DocumentTitle.getActiveInstance();
    },

    componentWillMount: function () {
        DocumentTitle.stack.push(this);
        DocumentTitle.updateDocumentTitle();
    },

    componentDidUpdate: function (prevProps) {
        if (this.isActive() && prevProps.title !== this.props.title) {
            DocumentTitle.updateDocumentTitle();
        }
    },

    componentWillUnmount: function () {
        var index = DocumentTitle.stack.indexOf(this);
        DocumentTitle.stack.splice(index, 1);
        DocumentTitle.updateDocumentTitle();
    },

    render: function () {
        if (this.props.children) {
            return Children.only(this.props.children);
        } else {
            return <noscript/>;
        }
    }
});

module.exports = DocumentTitle;
