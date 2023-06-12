const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
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
    Post.associate = () => {
        Post.belongsTo(sequelize.models.User);
        Post.hasMany(sequelize.models.Reaction);
        Post.hasMany(sequelize.models.Comment);
    };

    return Post;
};
