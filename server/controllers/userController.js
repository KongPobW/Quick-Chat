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

module.exports.signin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "incorrect username", status: false });
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword)
            return res.json({ msg: "incorrect password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (e) {
        next(e);
    }
};