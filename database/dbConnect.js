const { Sequelize } = require('sequelize');
const {User} =require('../models/model')

// Replace 'your_database', 'your_username', 'your_password' with your actual MySQL database details
const sequelize = new Sequelize('test_database', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});


sequelize.sync({ force: true }).then(() => {
    console.log('Database and tables synced.');
  });

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
