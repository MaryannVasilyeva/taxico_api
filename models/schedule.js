module.exports = function( sequelize, DataTypes ){
    var Schedule = sequelize.define( 'Schedule',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true
            },
            type: {
                type: DataTypes.INTEGER( 2 ).UNSIGNED,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    isIn: [
                        [ 0, 1, 2, 3, 4, 5, 6 ]
                    ]
                },
                comment: "0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday"
            },
            start_day: {
                type: DataTypes.DATE,
                allowNull: true,
                validate: {
                    notEmpty: true
                }
            },
            end_day: {
                type: DataTypes.DATE,
                allowNull: true,
                validate: {
                    notEmpty: true
                }
            },
            vehicle_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            vehicle_plate_number: {
                type: DataTypes.STRING,
                allowNull: true
            },
            driver_id: {
                type: DataTypes.UUID,
                allowNull: false
            },
            driver_name: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: 'schedules',
            associate: function( models ){
                Schedule.hasMany( models.Vehicle );
                Schedule.hasMany( models.Driver );
            }
        } );
    return Schedule;
};
