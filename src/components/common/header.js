"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function () {
        console.log("HeaderPage:: renderig...");
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to="app" className="navbar-brand">
                        <img src="images/pluralsight-logo.png" />
                    </Link>
                    <ul className="nav navbar-nav">
                        <li><Link to="app">Home</Link></li> {/*<li><a href="/">Home</a></li> route ar path/name dia chole ++++ Link use korle href="/" post back kore na because react router take care about that*/}  
                        <li><Link to="authors">Authors</Link></li> {/*<li><a href="/#authors">Authors</a></li> route ar path/name dia chole*/}
                        <li><Link to="about">About</Link></li> {/*<li><a href="/#about">About</a></li> route ar path/name dia chole*/}
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;
