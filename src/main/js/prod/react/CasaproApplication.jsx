/** @jsx React.DOM */

var React = require("react");

var Navigation = require("./navigation.jsx");
var DocumentTitle = require("./component/DocumentTitle.jsx");
var Footer = require("./footer.jsx");

module.exports = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    render: function () {
        var logout = this.props.logout
        return (<div>
            <DocumentTitle title="Casapro"/>
            <Navigation user="test" logout={logout}/>
            <div className="main-container container">
                {this.props.children}
            </div>
            <Footer />
        </div>);
    }
});
