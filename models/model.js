

const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('test_database', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
  });

// Define a User Model
const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

// Define Ticket model
const Ticket = sequelize.define('Ticket', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticketType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

const Comment = sequelize.define('Comment', {
    commentText: DataTypes.TEXT,
  });

  // Hash the password before saving it to the database
  User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  });

  // Example method to compare the provided password with the stored hashed password
  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  // Event.belongsTo(User, { as: 'organizer' });


  // Define associations between models
  Event.hasMany(Ticket);
  Event.hasMany(Comment);
  User.hasMany(Event);
  User.hasMany(Ticket);
  User.hasMany(Comment);
  Ticket.belongsTo(User);
  Ticket.belongsTo(Event);
  Comment.belongsTo(User);
  Comment.belongsTo(Event);

// Synchronize the model with the database (create tables if they don't exist)
sequelize.sync()
  .then(() => {
    console.log('Database and tables created!');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

module.exports = { sequelize, User, Ticket, Event,Comment};
