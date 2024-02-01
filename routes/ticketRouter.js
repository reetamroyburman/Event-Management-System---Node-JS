const router = require("express").Router();
const ticketController = require("../controllers/ticketController");
const requireUser = require("../middleware/requireUser");

router.post("/create-ticket" , requireUser , ticketController.createTicket);
router.put("/update-ticket/:ticketId",requireUser, ticketController.updateTicket);
router.get("/view-tickets",requireUser, ticketController.getTicket);
router.get("/view-tickets-user",requireUser, ticketController.getTicketByUser);
router.post("/view-tickets-event",requireUser, ticketController.getTicketByEvent);
router.delete("/delete-ticket/:ticketid",requireUser, ticketController.deleteTicket);


module.exports = router;