const { signup, signin, setAvatar, getAllUsers } = require("../controllers/userController");

const router = require("express").Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/avatar/:id", setAvatar);

router.get("/allusers/:id", getAllUsers);

module.exports = router;