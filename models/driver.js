module.exports = function( sequelize, DataTypes ){
    var Driver = sequelize.define( 'Driver',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            driver_license_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            status: {
                type: DataTypes.INTEGER( 2 ).UNSIGNED,
                allowNull: true,
                defaultValue: 0,
                validate: {
                    isIn: [
                        [ 0, 1 ]
                    ]
                },
                comment: "0: Open, 1: Deleted"
            }
        } );
    return Driver;
};
