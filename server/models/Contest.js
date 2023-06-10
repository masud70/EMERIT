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
        },
        resultPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    Contest.associate = () => {
        Contest.belongsTo(sequelize.models.User);
        Contest.hasMany(sequelize.models.Registration);
        Contest.hasMany(sequelize.models.Submission);
        Contest.belongsToMany(sequelize.models.Question, { through: 'Contest_Question' });
    };
    return Contest;
};
