"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.getMessage = exports.createMessage = exports.getAllMessages = void 0;
const message_1 = require("../models/message");
const auth_1 = require("../services/auth");
// import { where } from "sequelize";
// CRUD operations
const getAllMessages = async (req, res, next) => {
    // retrieve and return an array of all messages
    let messageList = await message_1.Message.findAll();
    res.status(200).json(messageList);
};
exports.getAllMessages = getAllMessages;
const createMessage = async (req, res, next) => {
    // verify user; return 403 if unauthorized
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    // if message has incomplete information, return 400
    if (!req.body.message) {
        return res.status(400).send();
    }
    // assemble the new message from auth token and message body
    let newMessage = req.body;
    newMessage.userId = user.userId;
    newMessage.username = user.username;
    // save the message in the database
    let created = await message_1.Message.create(newMessage);
    return res.status(201).json(created);
};
exports.createMessage = createMessage;
const getMessage = async (req, res, next) => {
    // find the message that is referenced in the params
    let messageId = req.params.id;
    let message = await message_1.Message.findByPk(messageId);
    // if no message, return 404
    if (!message) {
        return res.status(404).json();
    }
    // return the found message
    res.status(200).json(message);
};
exports.getMessage = getMessage;
const updateMessage = async (req, res, next) => {
    // gather variables from req
    let user = await (0, auth_1.verifyUser)(req);
    let messageId = parseInt(req.params.id);
    let originalMessage = await message_1.Message.findByPk(messageId);
    // verify user posted original post; return 403 if unauthorized
    if (!user || user.userId != originalMessage?.userId) {
        return res.status(403).send();
    }
    // if message has incomplete information, return 400
    if (!req.body.message || !messageId || !originalMessage) {
        return res.status(400).send();
    }
    // assemble the new message from auth token and message body
    let newMessage = req.body;
    newMessage.messageId = messageId;
    newMessage.userId = user.userId;
    newMessage.username = user.username;
    // save the updated message in the database
    await message_1.Message.update(newMessage, {
        where: { messageId: messageId }
    });
    return res.status(201).json(newMessage);
};
exports.updateMessage = updateMessage;
const deleteMessage = async (req, res, next) => {
    // gather variables from req
    let user = await (0, auth_1.verifyUser)(req);
    let messageId = parseInt(req.params.id);
    let originalMessage = await message_1.Message.findByPk(messageId);
    // verify user posted original post; return 403 if unauthorized
    if (!user || user.userId != originalMessage?.userId) {
        return res.status(403).send();
    }
    // if message has incomplete information, return 400
    if (!req.body.message || !messageId || !originalMessage) {
        return res.status(400).send();
    }
    // otherwise delete the message
    await message_1.Message.destroy({ where: { messageId: messageId } });
    return res.status(201).json();
};
exports.deleteMessage = deleteMessage;
