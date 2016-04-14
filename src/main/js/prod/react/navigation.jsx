/** @jsx React.DOM */
var React = require("react");
var bootstrap = require("react-bootstrap");
var Navbar = bootstrap.Navbar;
var Nav = bootstrap.Nav;
var NavItem = bootstrap.NavItem;
var Glyphicon = bootstrap.Glyphicon;
var _ = require("lodash");
var Nothing = require("./component/Nothing.jsx");


module.exports = React.createClass({
    propTypes: {
        message: React.PropTypes.string.isRequired
    },
    event: function() {

    },
    render: function () {

        var showLogout = !this.props.logout ? ( <Nav><NavItem title="Projects" href="project.html"><Glyphicon glyph="dashboard"/> Projects</NavItem>
                                                                           <NavItem title="Clients" href="client.html"><Glyphicon glyph="stats"/> Clients</NavItem>
                                                                           <NavItem title="Reminders" href="courtesycall.html"><Glyphicon glyph="dashboard"/> Reminders</NavItem>
                                                                           <NavItem title="Company" href="company.html"><Glyphicon glyph="stats"/> Companies</NavItem>
                                                                           <NavItem title="Key People" href="crew.html"><Glyphicon glyph="stats"/> Key People</NavItem>
                                                                           <NavItem title="Logout" href="/logout">Logout</NavItem></Nav>) : <Nothing/>
        return (
            <div>
                <Navbar justified role="navigation" fixedTop inverse brand="CASAPRO">



                            {showLogout}




                </Navbar>
            </div>
        );
    }
});