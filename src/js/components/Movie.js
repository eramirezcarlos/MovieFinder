var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Movie = React.createClass({

    render:function() {


        var link= 'http://www.imdb.com/title/'+ this.props.movie.imdbID;
        if( this.props.movie.Poster === 'N/A' ){
            var photoPlaceholder = 'http://placehold.it/120x160';
        }else{
            var photoPlaceholder = this.props.movie.Poster;
        }

        return (
            <div className="well">
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <img className="img-thumbnail img-responsive" src={photoPlaceholder}  />
                    </div>
                    <div className="col-md-8 col-sm-8">
                        <h4 >{this.props.movie.Title} </h4>
                        <ul className="list-group">
                            <li className="list-group-item">
                                Year released : { this.props.movie.Year}
                            </li>
                            <li className="list-group-item">
                                IMDB ID : { this.props.movie.imdbID}
                            </li>

                        </ul>
                    </div>
                    <a className="btn btn-primary" href={link} >View on IMDB</a>

                </div>


            </div>
        );
    },

})

module.exports = Movie;
