import { Sequelize } from 'sequelize';
const db_name = 'db_pos';
const db_user = 'root';
const db_pass = '';
export const db = new Sequelize(db_name,db_user,db_pass,{
    dialect:'mysql',
    port:3306
});