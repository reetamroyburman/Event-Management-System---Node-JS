const router = require("express").Router();
const eventController = require("../controllers/eventController");
const requireUser = require("../middleware/requireUser");

router.post("/create-event",requireUser, eventController.createEvent);
router.put("/update-event/:title",requireUser, eventController.updateEvent);
router.delete("/delete-event/:title",requireUser, eventController.deleteEvent);
router.get("/view-events",requireUser, eventController.getEvents);

module.exports = router;