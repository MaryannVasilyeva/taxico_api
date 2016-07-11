var Sequelize = require( 'sequelize' );
var _ = require( 'lodash' );
var db = require( '../models' );
var Driver = db.Driver;
var Schedule = db.Schedule;

var _this = this;

// indexes all the drivers using a query to find all of them
exports.index = function( req, res, next ){
    var query = {
        where: {}
    };
    Driver.findAll( query )
        .done( function( err, drivers ){
            if( !!err ){
                console.log( 'there was an error in indexing drivers ' + err )
            } else{
                res.send( 200, { drivers: drivers } );
                return next();
            }
        } )
};

// create a new driver
exports.create = function( req, res, next ){
    // req.assert( 'driver', 'isObject' );

    var newDriver = Driver.build( {
        first_name: req.body.driver.first_name,
        last_name: req.body.driver.last_name,
        driver_license_number: req.body.driver.driver_license_number,
        status: 0
    } );
    newDriver.save().done( function( err ){
        if( !!err ){
            console.log( 'there was an error at creating the driver ' + err )
        } else{
            res.send( 201, { driver: newDriver } );
            return next();
        }
    } )

};
exports.view = function( req, res, next ){
    Driver.find( {
        where: {
            id: req.params.driver_id
        }
    } ).done( function( err, driver ){
        if( !!err ){
            console.log( 'there is an error viewing a driver' )
        } else if( !driver ){
            res.send( 404, { err: [ 'Driver not found' ] } )
        } else{
            Schedule.findAll( {
                where: {
                    driver_id: req.params.driver_id
                }
            } ).done( function( err, schedules ){
                if( !!err ){
                    console.log( 'err with schedules ' + JSON.stringify( err ) );
                } else if( !schedules ){
                    console.log( 'no schedules ' )
                } else{
                    res.send( 200, { schedules: schedules } );
                    return next();
                }
            } );
            res.send( 200, { driver: driver } );
            return next();
        }
    } )
};

// view an individual driver
// exports.view = function( req, res, next ){
//     console.log( 'when does it hit here?' + req.params.driver_id );
//     Driver.find( {
//         where: {
//             id: req.params.driver_id
//         }
//     } ).done( function( err, driver ){
//         if( !!err ){
//             console.log( 'there is an error viewing a driver' )
//         } else if( !driver ){
//             res.send( 404, { err: [ 'Driver not found' ] } )
//         } else {
//             res.send( 200, { driver: driver } );
//             return next();
//         }
//     } )
// };

// allows you to update the driver
exports.update = function( req, res, next ){

    Driver.find( {
        where: {
            id: req.params.driver_id
        }
    } ).done( function( err, driver ){
        if( !!err ){
            console.log( 'error updating the driver ' + JSON.stringify( err ) );
        } else{
            var updateValues = [
                { value: 'first_name', validation: _.isString },
                { value: 'last_name', validation: _.isString },
                { value: 'driver_license_number', validation: _.isString }
            ];
            _.forEach( updateValues, function( updateValue ){
                if( updateValue.validation( req.params.driver [ updateValue.value ] ) ){
                    driver.values[ updateValue.value ] = req.params.driver[ updateValue.value ];
                }
            } );
            driver.save().done( function( err ){
                if( !!err ){
                    console.log( 'trying to save updated driver ' + JSON.stringify( err ) );
                    return next();
                } else{
                    res.send( 200, { driver: driver } );
                    return next();
                }
            } )
        }
    } )
};

// allows you to delete the driver 
exports.delete = function( req, res, next ){
    console.log( req.params );
    Driver.find( {
        where: {
            id: req.params.driver_id
        }
    } ).done( function( err, driver ){
        if( !!err ){
            console.log( 'error with deleting the driver ' + err )
        } else if( !driver ){
            res.send( 404 );
            return next();
        } else{
            driver.destroy()
                .done( function( err, result ){
                    if( !!err ){
                        console.log( 'second error with deleting vehicle ' + err )
                    } else{
                        console.log( 'deleted' );
                        res.send( 200, { driver: result } );
                        return next();
                    }
                } )
        }
    } )
};


