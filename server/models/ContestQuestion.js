const { UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const ContestQuestion = sequelize.define('ContestQuestion', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4
        }
    });
    ContestQuestion.associate = () => {
        ContestQuestion.belongsTo(sequelize.models.Contest);
        ContestQuestion.belongsTo(sequelize.models.Question);
    };
    return ContestQuestion;
};
