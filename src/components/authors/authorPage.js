"use strict";
// Smart Component

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
//var AuthorApi = require('../../api/authorApi');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
    getInitialState: function () {// set initial state for component ** Mostly use in top level component(controller view) 
        return {
            authors: AuthorStore.getAllAuthors()                     // *****USING FLUX****
        };
    },
    //componentWillMount:::: Before initial render, both client and server   -->> Good sopt to set initial state
    //componentDidMount::::: After render     -->> Acess DOM, Integrate with Frameworks, set timers, AJAX requests
    // componentDidMount: function () {
    //     if (this.isMounted()) {
    //         this.setState({ authors: AuthorApi.getAllAuthors() });
    //     }
    // },

    componentWillMount: function () {
        AuthorStore.addChangeListener(this._onChange);// any time if store changes
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function () {
        AuthorStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ authors: AuthorStore.getAllAuthors() });
    },

    render: function () {
        console.log("AuthorPage:: rendering...");
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;