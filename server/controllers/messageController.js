const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {

        const { from, to, message } = req.body;

        const data = await Message.create({
            message: message,
            users: [from, to],
            sender: from,
        });

        if (data) {
            return res.json({ msg: "message added successfully" });
        } else {
            return res.json({ msg: "failed to add the message" });
        }

    } catch (e) {
        next(e);
    }
};

module.exports.getAllMessages = async (req, res, next) => {
};