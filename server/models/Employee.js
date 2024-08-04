const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Request = require('./Request');
const { password } = require('pg/lib/defaults');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    tableName: 'employees',
    timestamps: true
});

Employee.hasMany(Request, {
    foreignKey: 'employee_id',
    sourceKey: 'id'
});

Request.belongsTo(Employee, {
    foreignKey: 'employee_id',
    targetId: 'id'
})

module.exports = Employee;