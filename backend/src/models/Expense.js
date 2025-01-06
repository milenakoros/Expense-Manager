const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Category = require('./Category');

const Expense = sequelize.define('Expense', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define relationships
Expense.belongsTo(User, { onDelete: 'CASCADE' });
Expense.belongsTo(Category, { onDelete: 'CASCADE' });

module.exports = Expense;
