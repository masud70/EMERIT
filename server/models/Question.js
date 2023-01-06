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
        optionA: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        optionB: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        optionC: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        optionD: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        order: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A'
        }
    });
    Question.associate = () => {
        Question.belongsTo(sequelize.models.Contest);
        Question.belongsTo(sequelize.models.User);
    };

    return Question;
};
