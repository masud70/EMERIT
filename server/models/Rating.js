module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
    Rating.associate = () => {
        Rating.belongsTo(sequelize.models.User);
        Rating.belongsTo(sequelize.models.Contest);
    };

    return Rating;
};
