var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Movie = require('./Movie');

var MovieResults = React.createClass({

    render:function() {
        
        return (
            <div>
                
                <h3 className="text-center">Results {this.props.movies.length}</h3>
                {
                    this.props.movies.map( function(movie, i){
                        console.log('index', i);
                        return(
                                <Movie movie={movie} key={i} />

                        )

                    })
                }

            </div>
        )
    },

})

module.exports = MovieResults;
