"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
// set cors to allow access to the server;
const cors = require("cors");
app.use(cors({
    origin: "*",
    credentials: true
}));
// Add routing middleware here
app.use('/messages', messageRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
});
// Syncing our database
// Important! The alter keyword may delete data when tables are updated.
// TODO: Remove the {alter: true} before production.
models_1.db.sync({ alter: true }).then(() => {
    console.info('connected to the database!');
});
app.listen(3000);
