module.exports = (sequelize, DataTypes) => {
    const AdminRequest = sequelize.define('AdminRequest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        requestMessage: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requestStatus: {
            type: DataTypes.ENUM,
            values: ['pending', 'accepted', 'rejected'],
            defaultValue: 'pending',
            allowNull: false
        }
    });
    AdminRequest.associate = () => {
        AdminRequest.belongsTo(sequelize.models.User);
    };

    return AdminRequest;
};
