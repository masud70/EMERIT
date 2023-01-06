const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define('Registration', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        time: {
            type: DataTypes.TEXT
        }
    });
    Registration.associate = () => {
        Registration.belongsTo(sequelize.models.Contest);
        Registration.belongsTo(sequelize.models.User);
    };

    return Registration;
};
