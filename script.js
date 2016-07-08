var restify = require( 'restify' );
var restifyValidation = require( 'restify-validation' );
var db = require( './models' );
var config = require( './config/config.json' );

if( typeof process.env.NODE_ENV === 'undefined' ){
    process.env.NODE_ENV = 'production';
}

var server = restify.createServer( {
    name: config.api.name,
    version: config.api.version
} );

server.use( restify.acceptParser( server.acceptable ) );
server.use( restify.queryParser() );
server.use( restify.bodyParser() );
server.use( restify.authorizationParser() );
server.use( restify.CORS() );
server.use( restify.fullResponse() );
server.use( restifyValidation() );

db.sequelize.sync( { force: false } )
    .complete( function( err ){
        if( err ){
            throw err;
        }
        else{
            server.listen( config.api.port, function(){
                console.log( config.api.name + ' listening on port ' + config.api.port );
            } );
        }
    } );

require( './config/routes' )( server );
