import { Response, Request } from 'express';
import Joi from 'joi';
import { UserModel } from '../models/UserModel';
import bcrypt from 'bcrypt';

class UserController {
    async login(req:Request, res:Response){
        const schema = Joi.object({
            username:Joi.string().required(),
            password:Joi.string().required().min(8)
        });
        const { username,password } = await req.body;
        const {error} = schema.validate({ username,password });
        if(!error){
            const findUser:any = await UserModel.findOne({ where: { username:username} });
            const match = await bcrypt.compare(password, findUser.password);
            if(match) {
                res.status(200)
                .send({
                    'message':'Succes login',
                    'data':findUser
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
        let {username, password} = await req.body;
        const {error} = schema.validate({username,password});
        if(!error){
            const saltRounds = 10;
            const hash = await bcrypt.hash(password,saltRounds);
            const result = await UserModel.create({username,password:hash});
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