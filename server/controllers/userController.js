const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const foundUsername = await User.findOne({ username });
        if (foundUsername)
            return res.json({ msg: "username has already used", status: false });
        const foundEmail = await User.findOne({ email });
        if (foundEmail)
            return res.json({ msg: "email has already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (e) {
        next(e);
    }
};