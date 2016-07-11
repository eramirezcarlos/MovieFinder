var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var EventEmiter = require('events').EventEmitter;
var assign = require('object-assign');

var AppAPI = require('../utils/appApi.js');

var CHANGE_EVENT = 'change';

var _movies = [];
var _selected = '';

var AppStore = assign({}, EventEmiter.prototype, {

    setMovieResult : function( movies ){
        _movies = movies;
    },
    getMovieResults: function(){
        return _movies;
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function( callback ){
        this.on('change', callback );
    },
    removeChangeListener : function(){
        this.removeListener('change', callback );
    }


});
AppDispatcher.register( function( payload ){


    var action = payload.action;

    switch( action.ActionType ){

        case AppConstants.SEARCH_MOVIES:
            //execute the customized function from utils
            AppAPI.searchMovies( action.movie  );
            AppStore.emit(CHANGE_EVENT);
            break;
        case AppConstants.RECEIVE_MOVIE_RESULTS:
            //executes all the functionality directly on the AppStore
            AppStore.setMovieResult( action.movies );
            AppStore.emit(CHANGE_EVENT);
            break;


    }
    return true;
});

module.exports = AppStore;
