module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define('Submission', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        solution: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Submission.associate = () => {
        Submission.belongsTo(sequelize.models.Contest);
        Submission.belongsTo(sequelize.models.User);
        Submission.belongsTo(sequelize.models.Question);
    };

    return Submission;
};
