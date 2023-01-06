const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Contest = sequelize.define('Contest', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        start: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        end: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Contest.associate = () => {
        Contest.belongsTo(sequelize.models.User);
        Contest.hasMany(sequelize.models.Question);
    };
    return Contest;
};
