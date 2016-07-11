var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

    searchMovies : function( movie ){
        //console.log('searching for a movie ' + movie.title );
        AppDispatcher.handleViewAction({
            ActionType: AppConstants.SEARCH_MOVIES,
            movie: movie
        });
    },
    receiveMovieResults: function( movies ){
        //console.log('last step receive movie ' + movies );
        AppDispatcher.handleViewAction({
            ActionType: AppConstants.RECEIVE_MOVIE_RESULTS,
            movies: movies
        });

    }
    

}
module.exports = AppActions;
