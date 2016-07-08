module.exports = function( server ){

    var drivers = require( '../controllers/drivers' );
    server.get( '/drivers', drivers.index );
    server.post( '/drivers', drivers.create );
    // server.get( '/drivers/:driver_id', drivers.view );
    server.put( '/drivers/:driver_id/update', drivers.update );
    server.del( '/drivers/:driver_id', drivers.delete );

    var vehicles = require( '../controllers/vehicles' );
    server.get( '/vehicles', vehicles.index );
    server.post( '/vehicles', vehicles.create );
    // server.get( '/vehicles/:vehicle_id', vehicles.view );
    server.del( '/vehicles/:vehicle_id', vehicles.delete );

    var schedules = require( '../controllers/schedules' );
    server.get( '/schedules', schedules.index );
    server.post( '/schedules', schedules.create );
};
