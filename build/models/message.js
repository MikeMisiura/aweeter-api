"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserMessage = exports.MessageFactory = exports.Message = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
function MessageFactory(sequelize) {
    Message.init({
        messageId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'messages',
        sequelize
    });
}
exports.MessageFactory = MessageFactory;
function AssociateUserMessage() {
    user_1.User.hasMany(Message, { sourceKey: 'username', foreignKey: 'username' });
    Message.belongsTo(user_1.User, { targetKey: 'username', foreignKey: 'username' });
}
exports.AssociateUserMessage = AssociateUserMessage;
