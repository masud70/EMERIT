module.exports = (sequelize, DataTypes) => {
    const Contest = sequelize.define('Contest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        start: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Contest.associate = () => {
        Contest.belongsTo(sequelize.models.User);
        Contest.hasMany(sequelize.models.Registration);
        Contest.belongsToMany(sequelize.models.Question, {through: "Contest_Question"});
    };
    return Contest;
};
