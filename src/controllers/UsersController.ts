import { Response, Request } from 'express';
import Joi from 'joi';
import { UserModel } from '../models/UserModel';
import { IUser } from '../interfaces/UserInterface';

class UserController {
    async login(req:Request, res:Response){
        const schema = Joi.object({
            username:Joi.string().required(),
            password:Joi.string().required().min(8)
        });
        const { username,password } = await req.body;
        const {error} = schema.validate({ username,password });
        if(!error){
            const findUsername:any = await UserModel.findOne({ where: { username:username} });
            if(findUsername.password === password){
                res.status(200)
                .send({
                    'message':'Succes login',
                    'data':findUsername
                });
            }else{
                res.status(404)
                .send({
                    'message':'User or password not match',
                    'data':''
                });
            }
        }else{
            res.status(400)
                .send({
                    'message':error.message,
                    'data':''
                });
        }
        
    }
    async Register(req:Request, res:Response){
        const schema = Joi.object({
            username:Joi.string().required(),
            password:Joi.string().required().min(8)
        });
        const newUser = await req.body;
        const {error} = schema.validate(newUser);
        if(!error){
            const result = await UserModel.create(newUser);
            res.status(201)
                .send({
                    'message':'Created new user',
                    'data':result
                });
        }else{
            res.status(400)
                .send({
                    'message':error.message,
                    'data':''
                });
        }
    }
}
export default new UserController();