const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Reaction = sequelize.define('Reaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Reaction.associate = () => {
        Reaction.belongsTo(sequelize.models.User);
        Reaction.belongsTo(sequelize.models.Post);
    };

    return Reaction;
};
