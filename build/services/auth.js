"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUserToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const hashPassword = async (plainTextPassword) => {
    const saltRound = 6;
    const hash = await bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainTextPassword, hashPassword) => {
    return await bcrypt_1.default.compare(plainTextPassword, hashPassword);
};
exports.comparePasswords = comparePasswords;
const secret = 'Hello, Goodbye, Friend';
const signUserToken = async (user) => {
    let token = jsonwebtoken_1.default.sign({ userId: user.userId }, secret, { expiresIn: '1hr' });
    return token;
};
exports.signUserToken = signUserToken;
const verifyUser = async (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    try {
        let decoded = await jsonwebtoken_1.default.verify(token, secret);
        return user_1.User.findByPk(decoded.userId);
    }
    catch (err) {
        return null;
    }
};
exports.verifyUser = verifyUser;
