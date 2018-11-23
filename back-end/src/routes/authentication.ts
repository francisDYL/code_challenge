import express,{Request,Response}  from "express";
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { SECRET_KEY,EXPIRE_DATE} from '../config/jwt.config'
const authRoutes = express.Router();

authRoutes.post('/api/signUp',async (req: Request,res: Response) => {

    let email = req.body.email;
    let password = req.body.email;

    try{
        const user = await User.findOne({ email });

        if(user) {

            res.status(200);
            res.json({error: 'An user using this email already exist'});

        } else{ 
        const user = await User.create({ email, password });
        let token = jwt.sign({user: user}, SECRET_KEY, { expiresIn: EXPIRE_DATE });
        res.status(200);
        res.json({error: null,token: token, user: user});

      }
    }
    catch(error){
        res.status(500);
        res.json({error: 'internal server error'});
    }
    
});

authRoutes.post('/api/signIn',async (req: Request,res: Response) => {
    let email = req.body.email;
    let password = req.body.password;

    try{
        const user = await User.findOne({ email });
        if( !user ){
            res.status(404);
            res.json({error: 'User not found check email!'});
        } else {
            const hashPassword = user.toObject().password;
            const isValid = await user.schema.methods.isValidPassword(password,hashPassword);
            if(!isValid){
                res.status(403);
                res.json({error: 'Invalid password'});
            }
            else{    
            let token = jwt.sign({user: user}, SECRET_KEY, { expiresIn: EXPIRE_DATE });
            res.status(200);
            res.json({error: null,token: token, user: user});

            }
        } 
    }
    catch(error){
        res.status(500);
        res.json({error: 'internal server error'});
    }

});

export let checkToken = (req: Request, res: Response, next) => {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];
        jwt.verify(token, SECRET_KEY, (error,data) => {
            if(error){
                res.status(401);
                res.json({error: 'Unauthorized request'});
            } else {
                if(data.user){
                    req.body.user = data.user;
                    next();
                }
                else{
                    res.status(401);
                    res.json({error: 'Unauthorized request'});
                }
            }
        });

}



authRoutes.post('/api/isAuth',checkToken,(req: Request, res: Response) =>{
    res.status(200);
    res.json({isAuth: true});
});

//remeber to remove this one
authRoutes.post('/api/test',checkToken, (req: Request, res: Response) => {
    res.json(req.body.user);
});



export default authRoutes;