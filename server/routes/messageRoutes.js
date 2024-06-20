const { addMessage, getAllMessages } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmsg", addMessage);

router.get("/getmsg", getAllMessages);

module.exports = router;