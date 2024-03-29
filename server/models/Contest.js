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
        privacy: {
            type: DataTypes.STRING,
            defaultValue: 'private'
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: 'pass123'
        },
        resultPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    Contest.associate = () => {
        Contest.belongsTo(sequelize.models.User);
        Contest.hasMany(sequelize.models.Registration, { onDelete: 'CASCADE' });
        Contest.hasMany(sequelize.models.Submission, { onDelete: 'CASCADE' });
        Contest.hasMany(sequelize.models.Rating, { onDelete: 'CASCADE' });
        Contest.belongsToMany(sequelize.models.Question, {
            through: 'Contest_Question',
            onDelete: 'CASCADE'
        });
    };
    return Contest;
};
