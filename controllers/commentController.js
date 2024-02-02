const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize,Event,Comment } = require('../models/model');


const createComment =async (req,res)=>{
    try {
        const{eventid,comment} =req.body
        const user_id = req._id

        // Find the Event by title
      const event = await Event.findOne({
        where: {
          id: eventid,
        },
    });
    if(!event){
      return res.status(400).json({ error: 'Event not found' });
    }
    // Create a new Comment
    const newComment = await Comment.create({ 
      commentText:comment,
      userId:user_id, 
      eventId:eventid, 
    });

    // Return the newly created comment
    res.status(201).json({ message: 'Comment created successfully', event: newComment.toJSON() });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports={createComment}