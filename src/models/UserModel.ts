import { DataTypes } from "sequelize";
import { IUser } from '../interfaces/UserInterface';
import { db } from '../config/db';

export const UserModel = db.define<IUser>("users",{
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    username: {
        type:DataTypes.STRING
    },
    password: {
        type:DataTypes.STRING
    }
},{
    timestamps: false
});
