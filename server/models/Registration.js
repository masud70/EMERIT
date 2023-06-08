const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define(
        'Registration',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            time: {
                type: DataTypes.TEXT
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['UserId', 'ContestId'],
                    name: 'compositeIndex'
                }
            ]
        }
    );
    Registration.associate = () => {
        Registration.belongsTo(sequelize.models.Contest);
        Registration.belongsTo(sequelize.models.User);
    };

    return Registration;
};
