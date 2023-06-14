module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define('Otp', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Otp;
};
