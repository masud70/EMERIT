const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
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
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        marks: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    });
    Question.associate = () => {
        Question.belongsTo(sequelize.models.User);
        Question.hasMany(sequelize.models.Option);
    };

    return Question;
};
