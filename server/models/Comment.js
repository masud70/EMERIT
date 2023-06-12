const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Comment.associate = () => {
        Comment.belongsTo(sequelize.models.User);
        Comment.belongsTo(sequelize.models.Post);
    };

    return Comment;
};
