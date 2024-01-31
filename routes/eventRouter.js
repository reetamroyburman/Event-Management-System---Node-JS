const router = require("express").Router();
const eventController = require("../controllers/eventController");
const requireUser = require("../middlewares/requireUser");

router.post("/create-event",requireUser, eventController.createEvent);
// router.post("/update-event",requireUser, eventController.getEvents);
// router.get("/delete-event/:eventname",requireUser, authController.refreshAccessTokenController);
router.post("/view-events",requireUser, eventController.getEvents);

module.exports = router;