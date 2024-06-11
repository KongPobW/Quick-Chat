const { signup, signin, setAvatar } = require("../controllers/userController");

const router = require("express").Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/avatar/:id", setAvatar);

module.exports = router;