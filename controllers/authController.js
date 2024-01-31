const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize, User,Ticket } = require('../models/model');

const signupController = async (req, res) => {
    try {
        const {username,email,password} = req.body

        if(!username || !email ||!password){
            return res.status(400).send("All fields are required");
        }
        const newUser = await User.create({
            username,
            email,
            password,
          });

        console.log('User created successfully:', newUser.toJSON());
        sequelize.sync()
        .then(async () => {
         console.log('Database and tables created!');
        })
        .catch((err) => {
        console.error('Error synchronizing the database:', err);
        });
         return res.status(201).send('user created successfully')
        // return res.send(201, 'user created successfully');
        
    } catch (error) {
        console.error('Error creating user:', error.message);
        return res.status(400).json({'error' : error.message});
    }
};

const loginController = async (req, res) => {
    try {
        const { username,email, password } = req.body;

        if (!username|| !email || !password) {
            return res.status(400).send("All fields are required");
            // return res.send(error(400, "All fields are required"));
        }

        // const user = await User.findOne({ email }).select('+password');
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send("User is not registered");
            // return res.send(error(404, "User is not registered"));
        }

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return res.status(403).send("Incorrect password");
            // return res.send(error(403, "ncorrect password"));
        }

        const accessToken = generateAccessToken({
            _id: user._id,
        });

        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: true,
        });
        return res.status(200).send({ accessToken });

        // return res.send(success(200, { accessToken }));
    } catch (e) {
        return res.status(500).send({ error:e.message });

        // return res.send(error(500, e.message));
    }
};

const deleteUser = async (req, res) => {
    try {
        const username = req.params.username;
        // Find the user by username
        const user = await User.findOne({
        where: {
          username: username,
        },
        });

        // If the user is not found, return a 404 response
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await user.destroy();
        
        // Return a success response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle any errors that occurred during the deletion process
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};

const updateProfile = async (req, res) => {
    try {
        // const userId = req.params.id;
        const {username, newUserName } = req.body;

          // Find the user by ID
          const user = await User.findOne({ where: { username } });
      
          // If the user is not found, return a 404 response
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Update the user's profile fields
          user.username = newUserName;
      
          // Save the updated user
          await user.save();
      
          // Return the updated user profile
          res.json({ message: 'User profile updated successfully', user: user.toJSON() });
    } catch (error) {
     // Handle any errors that occurred during the update process
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
 };


const logoutController = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//internal functions
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "1d",
        });
        console.log(token);
        return token;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signupController,
    loginController,
    logoutController,
    deleteUser,
    updateProfile
};