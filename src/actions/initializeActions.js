"use strict";

//action ar main kaj api (authorApi)/database ar shathe

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');

// want to call this action when our application is initially loaded , so call it form main.js
var InitializeActions = {
    initApp: function () {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors()                 // asyns callback and promises are here to handel the responses   
            }
        });
    }
};

module.exports = InitializeActions;