const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        username: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        avatar: {
            type: DataTypes.TEXT,
            defaultValue: 'images/user.jpg'
        },
        role: {
            type: DataTypes.TEXT,
            defaultValue: 'user'
        },
        phone: {
            type: DataTypes.TEXT
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    User.associate = () => {
        User.hasMany(sequelize.models.Contest);
        User.hasMany(sequelize.models.Question);
        User.hasMany(sequelize.models.Registration);
        User.hasMany(sequelize.models.Post);
        User.hasMany(sequelize.models.Submission);
        User.hasMany(sequelize.models.Reaction);
        User.hasMany(sequelize.models.Comment);
    };
    return User;
};
