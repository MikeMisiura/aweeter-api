import { RequestHandler } from "express";
import { Message } from "../models/message";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";
// import { where } from "sequelize";

// CRUD operations
export const getAllMessages: RequestHandler = async (req, res, next) => {
    // retrieve and return an array of all messages
    let messageList = await Message.findAll()
    res.status(200).json(messageList)
}

export const createMessage: RequestHandler = async (req, res, next) => {
    // verify user; return 403 if unauthorized
    let user: User | null = await verifyUser(req);
    if (!user) { return res.status(403).send() }

    // if message has incomplete information, return 400
    if (!req.body.message) { return res.status(400).send() }

    // assemble the new message from auth token and message body
    let newMessage: Message = req.body;
    newMessage.userId = user.userId;
    newMessage.username = user.username;

    // save the message in the database
    let created = await Message.create(newMessage);
    return res.status(201).json(created);
}

export const getUserMessages: RequestHandler = async (req, res, next) => {

    // find the message that is referenced in the params
    let userId = req.params.userId
    let message = await Message.findAll({ where: { userId: userId } })

    // if no message, return 404
    if (!message) { return res.status(404).json() }

    // return the found message
    res.status(200).json(message)
}

export const getMessage: RequestHandler = async (req, res, next) => {

    // find the message that is referenced in the params
    let messageId = req.params.id
    let message = await Message.findByPk(messageId)

    // if no message, return 404
    if (!message) { return res.status(404).json() }

    // return the found message
    res.status(200).json(message)
}

export const updateMessage: RequestHandler = async (req, res, next) => {
    // gather variables from req
    let user: User | null = await verifyUser(req);
    let messageId: number | null = parseInt(req.params.id)
    let originalMessage: Message | null = await Message.findByPk(messageId)

    // verify user posted original post; return 403 if unauthorized
    if (!user || user.userId != originalMessage?.userId) { return res.status(403).send() }

    // if message has incomplete information, return 400
    if (!req.body.message || !messageId || !originalMessage) { return res.status(400).send() }

    // assemble the new message from auth token and message body
    let newMessage: Message = req.body;
    newMessage.messageId = messageId;
    newMessage.userId = user.userId;
    newMessage.username = user.username;

    // save the updated message in the database
    await Message.update(newMessage, {
        where: { messageId: messageId }
    });

    return res.status(201).json(newMessage)
}

export const deleteMessage: RequestHandler = async (req, res, next) => {
    // gather variables from req
    let user: User | null = await verifyUser(req);
    let messageId: number | null = parseInt(req.params.id)
    let originalMessage: Message | null = await Message.findByPk(messageId)

    // verify user posted original post; return 403 if unauthorized
    if (!user || user.userId != originalMessage?.userId) { return res.status(403).send() }

    // if message has incomplete information, return 400
    if ( !messageId || !originalMessage ) { return res.status(400).send() }

    // otherwise delete the message
    await Message.destroy({ where: { messageId: messageId } })

    return res.status(201).json()
}

