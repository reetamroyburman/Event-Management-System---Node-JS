const router = require("express").Router();
const commentController = require("../controllers/commentController");
const requireUser = require("../middleware/requireUser");

router.post("/create",requireUser, commentController.createComment);


module.exports = router;