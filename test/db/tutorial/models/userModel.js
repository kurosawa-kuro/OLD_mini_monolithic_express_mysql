module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            defaultValue: 'test@gmail.com'
        },
        gender: {
            type: DataTypes.STRING
        }
    }, {
        // tableName: 'users',
        // timestamps: false,
        // createdAt: false,
        // updatedAt: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // engine: 'MYISAM'
    });

    return User;
}