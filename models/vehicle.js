module.exports = function( sequelize, DataTypes ){
    var Vehicle = sequelize.define( 'Vehicle',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            plate_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.INTEGER( 2 ).UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    isIn: [
                        [ 0, 1 ]
                    ]
                },
                comment: "0: Open, 1: Deleted"
            }
            // tableName: 'vehicles',
            // associate: function( models ){
            //     Vehicle.belongsTo( models.Schedule );
            // }
        } );
    return Vehicle;
};