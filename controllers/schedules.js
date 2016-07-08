var Sequelize = require( 'sequelize' );
var _ = require( 'lodash' );
var db = require( '../models' );
var Driver = db.Driver;
var Schedule = db.Schedule;

// supposed to index all the schedules made
exports.index = function( req, res, next ){
    var query = {
        where: {}
    };
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
        driver_name: req.body.schedule.driver_name,
        vehicle_plate_number: req.body.schedule.vehicle_plate_number,
        start_day: req.body.schedule.start_day,
        end_day: req.body.schedule.end_day
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
exports.view = function( err, req, res ){
    Schedule.find( {
        where: {
            id: req.params.schedule_id
        }
    } ).done( function( err, schedule ){
        if( !!err ){
            console.log( 'there is an error viewing a vehicle' )
        } else if( !schedule ){
            res.send( 404, { err: [ 'Vehicle not found' ] } )
        } else{
            res.send( 200, { schedule: schedule } );
            return next();
        }
    } )
};