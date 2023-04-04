import { comparePasswords, hashPassword, signUserToken, verifyUser } from './../services/auth';
import { RequestHandler } from "express";
import { User } from "../models/user";


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


export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body

    // check that all inputs are present
    if (!newUser.username || !newUser.password || !newUser.email ||
        !newUser.firstName || !newUser.lastName) {
        return res.status(400).send("missing information")
    }

    // hash the password
    let hashedPassword = await hashPassword(newUser.password)
    newUser.password = hashedPassword

    // create the user in the database
    let created = await User.create(newUser)
    res.status(200).json(created)
}

export const loginUser: RequestHandler = async (req, res, next) => {
    // check that all inputs are present
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("missing information")
    }

    // look up user in database
    let existingUser: User | null = await User.findOne({
        where: { username: req.body.username }
    })

    // ensure that the user exists
    if (!existingUser) {
        return res.status(401).json('Invalid username');
    }

    // ensure that the password matches
    let passwordsMatch = await comparePasswords(req.body.password, existingUser.password)
    if (!passwordsMatch) {
        return res.status(401).json('Incorrect password');
    }

    // issue JWT token
    let token = await signUserToken(existingUser)
    return res.status(200).json({ token })
}

export const getUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)

    // if no user, return a 401 response
    if (!user){return res.status(401).send()}

    let { username, firstName, lastName, email } = user

    res.status(200).json({
        username,
        firstName,
        lastName,
        email
    })
}

