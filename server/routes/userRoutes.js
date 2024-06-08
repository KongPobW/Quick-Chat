const { signup } = require("../controllers/userController");

const router = require("express").Router();

router.post("/sign-up", signup);

module.exports = router;