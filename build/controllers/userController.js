"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.createUser = void 0;
const auth_1 = require("./../services/auth");
const user_1 = require("../models/user");
// import mysql, { MysqlError } from 'mysql';
// // setup MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'Password1!',
//     database: `tweeterdb`
// });
// db.connect((err: MysqlError) => {
//     if (err) {
//         console.error('error connecting to database: ' + err.stack);
//         return;
//     }
//     console.log('successfully connected as id ' + db.threadId);
// });
// CRUD operations
const createUser = async (req, res, next) => {
    let newUser = req.body;
    // check that all inputs are present
    if (!newUser.username || !newUser.password || !newUser.email ||
        !newUser.firstName || !newUser.lastName) {
        return res.status(400).send("missing information");
    }
    // hash the password
    let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
    newUser.password = hashedPassword;
    // create the user in the database
    let created = await user_1.User.create(newUser);
    res.status(200).json(created);
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    // check that all inputs are present
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("missing information");
    }
    // look up user in database
    let existingUser = await user_1.User.findOne({
        where: { username: req.body.username }
    });
    // ensure that the user exists
    if (!existingUser) {
        return res.status(401).json('Invalid username');
    }
    // ensure that the password matches
    let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
    if (!passwordsMatch) {
        return res.status(401).json('Incorrect password');
    }
    // issue JWT token
    let token = await (0, auth_1.signUserToken)(existingUser);
    return res.status(200).json({ token });
};
exports.loginUser = loginUser;
const getUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    // if no user, return a 401 response
    if (!user) {
        return res.status(401).send();
    }
    let { username, firstName, lastName, email } = user;
    res.status(200).json({
        username,
        firstName,
        lastName,
        email
    });
};
exports.getUser = getUser;
