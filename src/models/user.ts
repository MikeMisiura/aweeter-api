import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare userId: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare createdAt: string;
    declare updatedAt: string;
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        indexes: [{unique:true, fields: ['username', 'email']}],
        freezeTableName: true,
        tableName: 'users',
        sequelize
    });}