import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import { db } from './models';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../src/public')));

// set cors to allow access to the server;
const cors = require("cors")
app.use(
    cors({
        origin: "*",
        credentials: true
    })
)

// Add routing middleware here
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
})

// Syncing our database
    // Important! The alter keyword may delete data when tables are updated.
    // TODO: Remove the {alter: true} before production.
db.sync({ alter: true }).then(() => {
    console.info('connected to the database!')
});

app.listen(3000);