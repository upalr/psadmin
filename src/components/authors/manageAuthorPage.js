"use strict";
//smart component

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
//var AuthorApi = require('../api/authorApi'); // no longer use Apidirectly. we can now use flux's action for accessing web api.
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            author: { id: '', firstName: '', lastName: '' },
            errors: {},
            dirty: false
        };
    },

    // Invoked once BEFORE first render
    componentWillMount: function () {
        // Calling setState here does not cause a re-render
        var authorId = this.props.params.id; // from the path '/author:id'

        if (authorId) {
            //this.setState({ author: AuthorApi.getAuthorById(authorId) });
            this.setState({ author: AuthorStore.getAuthorById(authorId) });             // *****USING FLUX****
        }
    },

    setAuthorState: function (event) {  //called for every keypress
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({ author: this.state.author }); // also warks without "return" // this.setState({ author: this.state.author }); 
    },

    authorFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be atleast 3 characters.';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be atleast 3 characters.';
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });
        return formIsValid;
    },

    saveAuthor: function (event) {
        event.preventDefault(); //prevent page load

        if (!this.authorFormIsValid()) {
            return;
        }

        //AuthorApi.saveAuthor(this.state.author);
        if (this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
        } else {
            AuthorActions.createAuthor(this.state.author);                  // *****USING FLUX****
        }
        this.setState({ dirty: false });
        toastr.success('Author Saved');
        this.transitionTo('authors');
    },

    render: function () {
        console.log("ManageAuthorPage:: author Form is rendering...");
        return (
            <AuthorForm author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors} />
        );
    }
});

module.exports = ManageAuthorPage;