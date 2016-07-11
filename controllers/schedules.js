var Sequelize = require( 'sequelize' );
var _ = require( 'lodash' );
var db = require( '../models' );
var Driver = db.Driver;
var Schedule = db.Schedule;
var Vehicle = db.Vehicle;

// supposed to index all the schedules made
exports.index = function( req, res, next ){
    var query = {
        where: []
    };
    if( req.params.vehicle_id ){
        query.where.push( { vehicle_id: req.params.vehicle_id } );
    }
    if( req.params.driver_id ){
        query.where.push( { driver_id: req.params.driver_id } );
    }
    Schedule.findAll( query )
        .done( function( err, schedules ){
            if( !!err ){
                console.log( 'there was an error in indexing schedules ' + err )
            }
            else if( !schedules ){
                console.log( 'freaking no schedules found' )
            }
            else{
                res.send( 200, { schedules: schedules } );
                return next();
            }
        } )
};
//create a new schedule with vehicle id and driver name
exports.create = function( req, res, next ){

    var newSchedule = Schedule.build( {
        driver_id: req.body.schedule.driver_id,
        driver_name: req.body.schedule.driver_name,
        vehicle_plate_number: req.body.schedule.vehicle_plate_number,
        type: req.body.schedule.type
    } );
    newSchedule.save().done( function( err ){
        if( !!err ){
            console.log( 'there is an error creating schedule ' + JSON.stringify( err ) );
            return next();
        } else{
            res.send( 201, { schedule: newSchedule } );
            return next();
        }
    } )
};

// view an individual schedule
exports.view = function( req, res, next ){

    Schedule.find( {
        where: {
            id: req.params.schedule_id
        }
    } ).done( function( err, schedule ){
        if( !!err ){
            console.log( 'there is an error viewing a vehicle' )
        } else if( !schedule ){
            res.send( 404, { err: [ 'Schedule not found' ] } )
        } else{
            Driver.findAll( {
                where: {
                    id: schedule.driver_id
                }
            } ).done( function( err, driver ){
                if( !!err ){
                    console.log( 'error finding the driver ' + JSON.stringify( err ) )
                } else if( !driver ){
                    console.log( 404, { err: [ "No driver" ] } )
                } else{
                    Vehicle.find( {
                        where: {
                            id: schedule.vehicle_id
                        }
                    } ).done( function( err, vehicle ){
                        if( !!err ){
                            console.log( 'err with vehicle ' + JSON.stringify( err ) );
                        } else if( !vehicle ){
                            console.log( 404, { err: [ 'no vehicle ' ] } );
                        } else{
                            res.send( 200, { vehicle: vehicle } );
                            return next();
                        }
                    } );
                    res.send( 200, { driver: driver } );
                    return next();
                }
            } );
            res.send( 200, { schedule: schedule } );
            return next();
        }
    } )
};