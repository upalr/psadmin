"use strict";
// you can have one store per application or you can create multiple stores as you application grows. 
// I find it helpful to create a store for each mejor concept or domain in the application. 
//For now our application sollowly work with author data but i expect this app to handel courses in the future 

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;//node's event emitter is used to brodcast events from our stores so that react components are notified when stores changed    
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = []; // keep this private so that nobody can mess with this data **use getAuthors() for get the _athors**

//We are exporting author store because this is the public api for our store 
var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors: function () {
        return _authors;
    },

    getAuthorById: function (id) {
        return _.find(_authors, { id: id });
    }
});

// this is a private implimentation detail that just registers our store with the dispatcher
Dispatcher.register(function (action) {
    // This where flux's dispatcher differs from the traditional publish subscribe patterns
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.UPDATE_AUTHOR:
            var existingAuthor = _.find(_authors, { id: action.author.id });
            var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.DELETE_AUTHOR:
            _.remove(_authors, function (author) {
                return action.id === author.id;
            });
            AuthorStore.emitChange();
            break;
        default:
        //no op
    }
});

module.exports = AuthorStore;// We are exporting author store because this is the public api for our store 
                            // this is a private implimentation detail that just registers our store with the dispatcher
