const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize,Event } = require('../models/model');
const { Op } = require('sequelize');

const createEvent = async (req,res) =>{
      const { title, description, date, time, location } = req.body;
      try {
          // Validate required fields
          if (!title || !description || !date || !time || !location) {
            return res.status(400).json({ error: 'Missing required fields' });
          }

          const organizer = req._id;
      
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
          res.status(500).json({ error: 'Internal Server Error' });
        }
}

const getEvents = async (req,res)=>{
      try {
          // Retrieve all events from the database
          const events = await Event.findAll();
      
          // Return the list of events
          res.json({ events });
        } catch (error) {

          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });   // Handle any errors that occurred during the retrieval process
        }
}

const updateEvent = async (req, res) => {
    try {
        const title = req.params.title;
        const { newTitle, newDescription, newDate, newTime, newLocation } = req.body;

        // Validate required fields
        if (!newTitle || !newDescription || !newDate || !newTime || !newLocation) {
            return res.status(400).json({ error: 'Missing required fields' });
          }

          // Find the Event by title
          const event = await Event.findOne({ where: { title } });
      
          // If the Event is not found, return a 404 response
          if (!event) {
            return res.status(404).json({ error: 'Event not found' });
          }
      
          // Update the Event fields
          event.title = newTitle;
          event.description = newDescription;
          event.date = newDate;
          event.time = newTime;
          event.location = newLocation;

          // Save the updated event
          await event.save(); 
      
          // Return the updated Event 
          res.json({ message: 'Event  updated successfully', event: event.toJSON() });
    } catch (error) {
     
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });   // Handle any errors that occurred during the update process
    }
};

const deleteEvent = async (req, res) => {
  try {
      const eventTitle = req.params.title;
      // Find the Event by title
      const event = await Event.findOne({
      where: {
        title: eventTitle,
      },
      });

      // If the Event is not found, return a 404 response
      if (!event) {
      return res.status(404).json({ error: 'Event not found' });
      }

      // Delete the Event
      await event.destroy();
      
      // Return a success response
      res.json({ message: 'Event deleted successfully' });
  } catch (error) {
      // Handle any errors that occurred during the deletion process
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });

  }
};

const getEventsbyQuery = async (req,res) =>{
  try {
    const { title, date, location } = req.query;

    const searchCriteria = {};

    if (title) {
      searchCriteria.title = { [Op.like]: `%${title}%` };
    }

    if (date) {
      searchCriteria.date = { [Op.eq]: new Date(date) };
    }

    if (location) {
      searchCriteria.location = { [Op.like]: `%${location}%` };
    }

    const events = await Event.findAll({
      where: searchCriteria,
    });

    res.json(events);
  } catch (error) {
    
  }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    getEventsbyQuery
};