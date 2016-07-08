var Sequelize = require( 'sequelize' );
var _ = require( 'lodash' );
var db = require( '../models' );
var Driver = db.Driver;
var Schedule = db.Schedule;
var Vehicle = db.Vehicle;

exports.index = function( req, res, next ){
    var query = {
        where: {}
    };
    Vehicle.findAll( query )
        .done( function( err, vehicles ){
            if( !!err ){
                console.log( 'there was an error in indexing drivers ' + err )
            } else{
                res.send( 200, { vehicles: vehicles } );
                console.log( 'vehicles   ' + JSON.stringify( vehicles ) );
                return next();
            }
        } )

};
// exports.view = function( err, req, res ){
//     Vehicle.find( {
//         where: {
//             id: req.params.vehicle_id
//         },
//         include: {
//             model: Schedule
//         }
//     } ).done( function( err, vehicle ){
//         if( !!err ){
//             console.log( 'there is an error viewing a vehicle' )
//         } else if( !vehicle ){
//             res.send( 404, { err: [ 'Vehicle not found' ] } )
//         } else{
//             res.send( 200, { vehicle: vehicle } );
//             return next();
//         }
//     } )
// };
exports.create = function( req, res, next ){
    console.log( 'there was an error ' + JSON.stringify( req.body.vehicle ) );
    var newVehicle = Vehicle.build( {
        plate_number: req.body.vehicle.plate_number,
        status: 0
    } );
    newVehicle.save().done( function( err ){
        if( !!err ){
            console.log( 'there was an error at creating the vehicle ' + JSON.stringify( err ) )
        } else{
            res.send( 201, { vehicle: newVehicle } );
            console.log( 'newVehicle   ' + JSON.stringify( newVehicle ) );
            return next();
        }
    } )

};
exports.delete = function( req, res, next ){
    
    Vehicle.find( {
        where: {
            id: req.params.vehicle_id
        }
    } ).done( function( err, vehicle ){
        if( !!err ){
            console.log( 'error with deleting the driver ' + err )
        } else if( !vehicle ){
            res.send( 404 );
            return next();
        } else{
            vehicle.destroy()
                .done( function( err, result ){
                    if( !!err ){
                        console.log( 'second error with deleting vehicle ' + err )
                    } else{
                        res.send( 200, { vehicle: result } );
                        return next();
                    }
                } )
        }
    } )
};

