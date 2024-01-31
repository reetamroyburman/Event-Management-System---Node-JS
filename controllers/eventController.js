const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize, User,Event } = require('../models/model');

const createEvent = async (req,res) =>{
    const { title, description, date, time, location, organizer } = req.body;
    try {
        // Validate required fields
        if (!title || !date || !time || !location || !organizer) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
    
        // Create a new event
        const newEvent = await Event.create({
          title,
          description,
          date,
          time,
          location,
          organizer,
        });
    
        // Return the newly created event
        res.status(201).json({ message: 'Event created successfully', event: newEvent.toJSON() });
      } catch (error) {
        // Handle Sequelize validation errors
        if (error instanceof sequelize.ValidationError) {
          const errors = error.errors.map((e) => ({
            field: e.path,
            message: e.message,
          }));
          return res.status(400).json({ error: 'Validation error', details: errors });
        }
    
        // Handle other errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


const getEvents =async(req,res)=>{
    try {
        // Retrieve all events from the database
        const events = await Event.findAll();
    
        // Return the list of events
        res.json({ events });
      } catch (error) {
        // Handle any errors that occurred during the retrieval process
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


module.exports = {
    createEvent,
    getEvents
};