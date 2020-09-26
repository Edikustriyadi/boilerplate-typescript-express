import { joi } from "joiful";
import { Model } from "sequelize";

export interface IUser extends Model{
    id?:number,
    username:string;
    password:string;
}