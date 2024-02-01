const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize,Ticket,User,Event } = require('../models/model');


const createTicket = async (req,res) =>{
      try {
        const { eventTitle, ticketType, price, quantity } = req.body;

        const userId =  req._id
        const event = await Event.findOne({ where: { title:eventTitle } });
        const eventId = event.dataValues.id



        // Validate required fields
        if (!eventId || !ticketType || !price || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
          }

        // Create a new event
        const newTicket = await Ticket.create({ userId, eventId, ticketType, price, quantity });
      
        // Return the newly created ticket
        res.status(200).json({ message: 'Ticket created successfully', ticket: newTicket.toJSON() });

        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
}

// const buyticket = async (req,res) =>{
//     try {
//         const { userId, eventId, ticketType, price, quantity } = req.body;
//         // Check if the user and event exist
//         const user = await User.findByPk(userId);
//         const event = await Event.findByPk(eventId);

//         if (!user || !event) {
//             return res.status(404).json({ message: 'User or event not found' });
//           }

//         // Check if there are enough available tickets
//         const availableTickets = await Ticket.sum('quantity', { where: { eventId } });

//         if (availableTickets < quantity) {
//             return res.status(400).json({ message: 'Not enough available tickets' });
//           }

//         // Create a new ticket
//     const ticket = await Ticket.create({ userId, eventId, ticketType, price, quantity });

//     // Update the available tickets for the event
//     event.availableTickets = availableTickets - quantity;
//     await event.save();

//     res.json(ticket);

//     } catch (error) {
        
//     }

// }

const getTicket = async (req,res)=>{
      try {
        // Retrieve all Tickets from the database
        const tickets = await Ticket.findAll();

        // Return the list of Tickets
        res.json({ tickets });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });   // Handle any errors that occurred during the retrieval process
        }
}

const getTicketByUser = async (req,res)=>{
    try {
      // Retrieve Tickets by user id
      const user_Id = req._id
      const tickets = await Ticket.findAll({ where: { userId:user_Id } });

      // Return the list of Tickets
      res.json({ tickets });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });   // Handle any errors that occurred during the retrieval process
      }
}

const getTicketByEvent = async (req,res)=>{
    try {

        const{eventTitle} =req.body

        const event = await Event.findOne({ where: { title:eventTitle } });
        console.log(event);
        const event_Id = event.dataValues.id

        // Retrieve all Tickets by event
         const tickets = await Ticket.findAll({ where: { EventId:event_Id } });

        // Return the list of Tickets
        res.json({ tickets });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });   // Handle any errors that occurred during the retrieval process
      }
}

const updateTicket = async (req, res) => {
    try {
        const ticket_Id = req.params.ticketId;
        const { updateQuantity } = req.body;

        // Validate required fields
        if (!updateQuantity ) {
            return res.status(400).json({ error: 'Missing required fields' });
          }

        // const updatedTicket = await Ticket.update(req.body, { where: { id: ticketId } });

          // Find the ticket by id
          const ticket = await Ticket.findOne({ where: { id:ticket_Id } });

          // Update the Event fields
          ticket.quantity = updateQuantity

          // Save the updated event
          await ticket.save(); 
      
          // Return the updated Ticket 
          res.json({ message: 'Ticket  updated successfully', updatedTicket: ticket.toJSON() });
    } catch (error) {
     
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });   // Handle any errors that occurred during the update process
    }
};

const deleteTicket = async (req, res) => {
  try {
      const ticket_Id = req.params.ticketid;
      // Find the Ticket by title
      const ticket = await Ticket.findOne({
      where: {
        id: ticket_Id,
      },
      });

      // If the Ticket is not found, return a 404 response
      if (!ticket) {
      return res.status(404).json({ error: 'Event not found' });
      }

      // Delete the Event
      await ticket.destroy();
      
      // Return a success response
      res.json({ message: 'Event deleted successfully' });
  } catch (error) {
      // Handle any errors that occurred during the deletion process
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });

  }
};

module.exports = {
    createTicket,
    // buyticket,
    getTicket,
    getTicketByUser,
    getTicketByEvent,
    updateTicket,
    deleteTicket
};