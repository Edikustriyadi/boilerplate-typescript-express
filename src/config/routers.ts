import * as express from 'express';
import UsersController from '../controllers/UsersController';

class Routers {
    public router = express.Router();
    constructor() {
        this.main();
    }
    main(){
        this.router.post('/users/login',UsersController.login)
                    .post('/users/register',UsersController.Register)
                    ;
    }
}
export default new Routers()