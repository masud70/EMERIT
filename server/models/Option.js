const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Option = sequelize.define('Option', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Option.associate = () => {
        Option.belongsTo(sequelize.models.Question);
    };

    return Option;
};
