import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Routers from './config/routers';
import { db } from './config/db';

class App {
    public app = express();
    constructor(){
        dotenv.config();
        db.sync();
        this.app.use(bodyParser.json())
                .use(bodyParser.urlencoded({extended:false}))
                .use('/',Routers.router)
                ;
    }
    async listen(){
        this.app.listen(process.env.PORT, () => {
            console.log('server Running');
        });
    }
}
export default new App();